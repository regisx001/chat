<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<section
	class="card card-hover p-10 absolute max-w-2xl w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
>
	<header class="card-header p-4">
		<h2 class="font-bold text-center">Create New Room</h2>
	</header>
	<form action="?/createRoom" method="post" use:enhance>
		<div class="flex flex-col gap-4">
			<input placeholder="Title ..." class="input" type="text" name="title" id="" />
			<textarea placeholder="Description ..." class="input" name="description" id="" rows="4" />
			<div>
				<button class="btn variant-filled-primary w-full">Create</button>
			</div>
		</div>
	</form>
</section>
