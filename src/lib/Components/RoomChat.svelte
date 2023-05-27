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

	function timePassed(created: Date) {}

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
	<div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr]">
		<!-- Navigation -->
		<div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
			<!-- Header -->
			<header class="border-b border-surface-500/30 p-4">
				<input class="input" type="search" placeholder="Search..." />
			</header>
			<!-- List -->
			<div class="p-4 space-y-4 overflow-y-auto">LIST</div>
			<!-- Footer -->
			<!-- <footer class="border-t border-surface-500/30 p-4">(footer)</footer> -->
		</div>
		<!-- Chat -->
		<div class="h-full relative flex flex-col flex-auto">
			<!-- Conversation -->
			<section bind:this={elemChat} class="max-h-screen pb-24 p-4 overflow-y-auto space-y-4">
				{#each messages as message}
					{#if current_user.id == message.writer}
						<div class="my-2 grid grid-cols-[1fr_auto] gap-2">
							<div class="card p-4 rounded-tr-none space-y-2 variant-soft-success">
								<header class="flex justify-between items-center">
									<p class="font-bold">@{message.username}</p>
									<small class="opacity-50">{message.created}</small>
								</header>
								<p>{message.message}</p>
							</div>
							<Avatar
								src={getAvatarUrl(message.expand.writer)
									? getAvatarUrl(message.expand.writer)
									: 'https://i.pravatar.cc'}
								width="w-12"
							/>
						</div>
					{:else}
						<div class="my-2 grid grid-cols-[auto_1fr] gap-2">
							<Avatar
								src={getAvatarUrl(message.expand.writer)
									? getAvatarUrl(message.expand.writer)
									: 'https://i.pravatar.cc'}
								width="w-12"
							/>
							<div class="card p-4 variant-soft rounded-tl-none space-y-2">
								<header class="flex justify-between items-center">
									<p class="font-bold">@{message.username}</p>
									<small class="opacity-50">{message.created}</small>
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
