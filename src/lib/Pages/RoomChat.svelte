<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { getAvatarUrl, pb_client } from '$lib/Utils/utils';
	export let room: any;
	export let messages: any = [];
	export let current_user: any;
	let elemChat: HTMLElement;
	let messageInput: HTMLElement;

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function timePassed(created: string) {
		const date = new Date();
		const oldTimestamp = Date.parse(created) / 1000;
		const timestamp = date.getTime();
		const seconds = Math.floor(timestamp / 1000);
		const difference = seconds - oldTimestamp;
		let output = ``;
		if (difference < 60) {
			// Less than a minute has passed:
			output = `${Math.round(difference)} seconds ago`;
		} else if (difference < 3600) {
			// Less than an hour has passed:
			output = `${Math.floor(difference / 60)} minutes ago`;
		} else if (difference < 86400) {
			// Less than a day has passed:
			output = `${Math.floor(difference / 3600)} hours ago`;
		} else if (difference < 2620800) {
			// Less than a month has passed:
			output = `${Math.floor(difference / 86400)} days ago`;
		} else if (difference < 31449600) {
			// Less than a year has passed:
			output = `${Math.floor(difference / 2620800)} months ago`;
		} else {
			// More than a year has passed:
			output = `${Math.floor(difference / 31449600)} years ago`;
		}
		return output;
	}

	const enhancement: SubmitFunction = async () => {
		return async ({ update, result }) => {
			// @ts-ignore
			const data = result?.data;
			if (data?.success) {
				setTimeout(() => {
					scrollChatBottom('smooth');
					messageInput.focus();
				}, 200);
			}
			await update();
		};
	};

	onMount(() => {
		scrollChatBottom('smooth');
		pb_client.collection('messages').subscribe('*', (e) => {
			if (e.action == 'create') {
				if (e.record.room === room.id) {
					setTimeout(() => {
						scrollChatBottom('smooth');
					}, 200);
				}
			}
		});
	});
</script>

<section class="card w-full h-screen">
	<div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[20%_1fr]">
		<!-- Navigation -->
		<div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
			<!-- Header -->
			<header class="border-b border-surface-500/30 p-4">
				<input class="input" type="search" placeholder="Search..." />
			</header>
			<!-- List -->
			<div class="p-4 space-y-4 overflow-y-auto">
				<nav class="list-nav px-2">
					<h3 class="text-center font-bold">Participants</h3>
					<!-- (optionally you can provide a label here) -->
					<ul>
						{#each room.expand.participants || [] as participant}
							<li>
								<a href="/elements/lists">
									<Avatar
										width={'w-8'}
										src={getAvatarUrl(participant)
											? getAvatarUrl(participant)
											: 'https://i.pravatar.cc'}
									/>
									<span class="flex-auto">@{participant.username}</span>
								</a>
							</li>
						{/each}
						<!-- ... -->
					</ul>
				</nav>
			</div>
			<!-- Footer -->
			<!-- <footer class="border-t border-surface-500/30 p-4">(footer)</footer> -->
		</div>
		<!-- Chat -->
		<div class="h-full relative flex flex-col flex-auto">
			<!-- Conversation -->
			<section
				bind:this={elemChat}
				class=" p-8 lg:px-28 max-h-screen pb-24 overflow-y-auto space-y-4"
			>
				{#each messages as message}
					{#if current_user.id == message.writer}
						<div class="my-2 grid grid-cols-[1fr_auto] gap-2">
							<div class="card p-4 rounded-tr-none space-y-2 variant-soft-primary">
								<header class="flex justify-between items-center">
									<p class="font-bold">@{message.username}</p>
									<small class="opacity-50">
										{timePassed(message.created)}
									</small>
								</header>
								<p>{message.message}</p>
							</div>
							<Avatar
								src={getAvatarUrl(message.expand.writer) ? getAvatarUrl(message.expand.writer) : ''}
								initials={message.expand.writer?.username}
								width="w-12"
							/>
						</div>
					{:else}
						<div class="my-2 grid grid-cols-[auto_1fr] gap-2">
							<Avatar
								src={getAvatarUrl(message.expand.writer) ? getAvatarUrl(message.expand.writer) : ''}
								initials={message.expand.writer?.username}
								width="w-12"
							/>
							<div class="card p-4 variant-soft-secondary rounded-tl-none space-y-2">
								<header class="flex justify-between items-center">
									<p class="font-bold">@{message.username}</p>
									<small class="opacity-50">
										{timePassed(message.created)}
									</small>
								</header>
								<p>{message.message}</p>
							</div>
						</div>
					{/if}
				{/each}
			</section>
			<!-- Prompt -->
			<section
				class="absolute bg-surface-600 rounded-lg right-0 bottom-0 w-full h-20 border-t border-surface-500/30 p-4"
			>
				<form action="?/sendMessage" method="post" use:enhance={enhancement}>
					<div class="flex rounded-md gap-4 flex-row input-group input-group-divider">
						<input
							bind:this={messageInput}
							placeholder="your Message here ... "
							class="input"
							type="text"
							name="message"
							id=""
						/>
						<input value={room.participants} type="hidden" name="participants" multiple />
						<input type="hidden" name="room" value={room.id} />
						<button class="btn input-group-shim rounded-md variant-filled-secondary">
							<i class="ti ti-send text-lg" />
							<div class="text-lg">Send</div>
						</button>
					</div>
				</form>
			</section>
		</div>
	</div>
</section>
