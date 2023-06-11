<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { getAvatarUrl } from '$lib/Utils/utils';
	export let previousPage: any;
	export let room: any;
</script>

<div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
	<!-- Header -->
	<header class="border-b border-surface-500/30 p-2">
		<a href={previousPage} class="btn flex items-center gap-4">
			<i class="ti ti-arrow-narrow-left text-3xl" />
			<p class="text-xl font-bold">Go back</p>
		</a>
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
