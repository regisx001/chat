<script lang="ts">
	import { getAvatarUrl } from '$lib/Utils/utils';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let messages: any;
	export let current_user: any;

	function timePassed(created: string) {
		const date = new Date();
		const oldTimestamp = Date.parse(created) / 1000;
		const timestamp = date.getTime();
		const seconds = Math.floor(timestamp / 1000);
		const difference = seconds - oldTimestamp;
		let output = ``;
		if (difference < 60) {
			// Less than a minute has passed:
			output = `${Math.floor(difference)} seconds ago`;
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
</script>

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
			<!-- <Avatar
				src={getAvatarUrl(message.expand.writer) ? getAvatarUrl(message.expand.writer) : ''}
				initials={message.expand.writer?.username}
				width="w-12"
			/> -->
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
