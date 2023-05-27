<script lang="ts">
	import RoomChat from '$lib/Components/RoomChat.svelte';
	import { page } from '$app/stores';
	import { pb_client } from '$lib/Utils/utils';
	import { onDestroy, onMount } from 'svelte';
	let data: any;
	$: room_id = $page.data.id;
	$: room = $page.data.room;
	$: messages = room.expand['messages(room)'];
	onMount(async () => {
		pb_client.collection('messages').subscribe('*', async (e) => {
			data = e;
			if (e.action == 'create') {
				if (e.record.room === room_id) {
					let user = await pb_client.collection('users').getOne(e.record.writer);
					e.record.expand = { user };
					messages = [...messages, e.record];
				}
			}
			if (e.action == 'delete') {
				if (e.record.room === room_id) {
					messages = messages.filter((m: any) => m.id !== e.record.id);
				}
			}
			if (e.action == 'update') {
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
</pre> -->

<!-- <pre>
	{JSON.stringify(messages, null, 2)}
</pre> -->
