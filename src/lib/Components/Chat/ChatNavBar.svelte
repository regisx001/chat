<script lang="ts">
	export let room: any;
</script>

<div
	class="z-[999] flex items-center justify-between px-4 lg:px-10 h-16 w-full bg-surface-700 absolute top-0 left-0"
>
	<p class="lg:h3 h4 font-bold">{room.title}</p>
	<a class="lg:text-2xl text-xl font-bold" href="/room/{room.id}/details">more details ...</a>
</div>
