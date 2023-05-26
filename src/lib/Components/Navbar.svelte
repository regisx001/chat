<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar>
	<svelte:fragment slot="lead">(icon)</svelte:fragment>
	<div class="hidden md:flex w-full justify-center">
		<input class="input rounded-lg max-w-md" type="text" placeholder="Search ... " />
	</div>
	<svelte:fragment slot="trail">(actions)</svelte:fragment>
</AppBar>
