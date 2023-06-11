<script lang="ts">
	import ChatNavigation from '$lib/Components/Chat/ChatNavigation.svelte';
	import MessagesFeed from '$lib/Components/Chat/MessagesFeed.svelte';
	import ChatNavBar from '$lib/Components/Chat/ChatNavBar.svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { pb_client } from '$lib/Utils/utils';
	export let room: any;
	export let messages: any = [];
	export let current_user: any;
	let elemChat: HTMLElement;
	let messageInput: HTMLElement;

	import { afterNavigate } from '$app/navigation';

	let previousPage: string = '/';

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
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

<section class="card w-full h-screen rounded-none">
	<div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[20%_1fr]">
		<!-- Navigation -->
		<ChatNavigation {room} {previousPage} />
		<!-- Chat -->
		<div class="h-full relative flex flex-col flex-auto">
			<ChatNavBar {room} />
			<!-- Conversation -->
			<section
				bind:this={elemChat}
				class=" p-8 lg:px-28 max-h-screen pt-20 pb-24 overflow-y-auto space-y-4"
			>
				<MessagesFeed {current_user} {messages} />
			</section>
			<!-- Prompt -->
			<section
				class="absolute bg-surface-800 right-0 bottom-0 w-full h-20 border-t border-surface-500/30 lg:px-20 p-2"
			>
				<form class=" p-2" action="?/sendMessage" method="post" use:enhance={enhancement}>
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
						<button class="btn input-group-shim rounded-md variant-filled-primary">
							<i class="ti ti-send text-lg" />
							<div class="text-lg">Send</div>
						</button>
					</div>
				</form>
			</section>
		</div>
	</div>
</section>
