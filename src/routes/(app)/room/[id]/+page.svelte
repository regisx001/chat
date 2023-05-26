<script lang="ts">
	import RoomChat from '$lib/Components/RoomChat.svelte';
	import { page } from '$app/stores';
	import { pb_client } from '$lib/Utils/utils';
	import { onDestroy, onMount } from 'svelte';
	import { record } from 'zod';
	let data: any;
	$: room_id = $page.data.id;
	$: room = $page.data.room;
	$: messages = room.expand['messages(room)'];
	onMount(async () => {
		pb_client.collection('messages').subscribe('*', async ({ record, action }) => {
			if (action == 'create') {
				if (record.room === room_id) {
					messages = [...messages, record];
				}
			}
			if (action == 'delete') {
				if (record.room === room_id) {
					messages = messages.filter((m: any) => m.id !== record.id);
				}
			}
			if (action == 'update') {
				// Todo
			}
		});
	});
	onDestroy(async () => {
		await pb_client.collection('rooms').unsubscribe();
	});
</script>

<RoomChat current_user={$page.data.user} {messages} {room} />

<!-- <pre>
	{JSON.stringify(data, null, 2)}
</pre>

<pre>
	{JSON.stringify(messages, null, 2)}
</pre> -->
