<script lang="ts">
	import { page } from '$app/stores';
</script>

<ul>
	{#each $page.data.rooms.items as item}
		<li>
			<a href="/room/{item.id}">{item.title}</a>
		</li>
	{/each}
</ul>

<pre>
    {JSON.stringify($page.data, null, 2)}
</pre>
