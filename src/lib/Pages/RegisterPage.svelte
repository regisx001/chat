<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { triggerToast } from '$lib/Utils/utils';
	import { goto } from '$app/navigation';
	$: image =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2eJr5UCVdhYSWunmUZk99a7ZYbcQSgOItnw&usqp=CAU';
	let showPassword = false;
	function showPass() {
		showPassword = !showPassword;
	}
	// Enhancement
	const enhancement: SubmitFunction = async ({ data }) => {
		return async ({ update, result }) => {
			// @ts-ignore
			const data = result?.data;
			if (data?.form?.email) {
				triggerToast(data?.form?.email.pop());
			}
			if (data?.form?.password) {
				triggerToast(data?.form?.password.pop());
			}
			if (data?.form?.passwordConfirm) {
				triggerToast(data?.form?.passwordConfirm.pop());
			}
			if (data?.passwordConfirm) {
				triggerToast(data?.passwordConfirm, 'variant-filled-primary');
			}
			if (data?.success) {
				triggerToast(
					'Succesfully Registered , Validate Your email at first !',
					'variant-filled-warning'
				);
				await goto('/login');
			}
			await update();
		};
	};
</script>

<section
	class="variant-soft-surface md:p-6 rounded-2xl flex flex-col md:flex-row
	justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%]
	 translate-y-[-50%] max-w-2xl md:max-w-6xl md:h-full md:max-h-[600px] w-full"
>
	<div class="w-2/6 p-2 flex flex-col-reverse md:m-8">
		<img class="hidden md:flex rounded-lg" src={image} alt="" />
		<h3 class="text-center w-full p-2 font-bold">Find Your Partner</h3>
	</div>
	<div class="max-w-xl w-full card card-hover shadow-2xl md:w-4/6">
		<h2 class="text-center font-bold pt-8 p-6">Register New Account</h2>
		<form
			class="flex-col p-8 flex gap-3"
			method="post"
			action="?/register"
			use:enhance={enhancement}
		>
			<input
				placeholder="Eg: example@gmail.com"
				type="text"
				class="input rounded-md"
				name="email"
			/>

			<div class="relative">
				<input
					placeholder="Password"
					type={!showPassword ? 'password' : 'text'}
					class="input rounded-md"
					name="password"
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={showPass} class="btn cursor-pointer py-2 px-4 absolute top-0 right-0">
					{#if showPassword}
						<i class="ti ti-eye-off text-xl" />
					{:else}
						<i class="ti ti-eye text-xl" />
					{/if}
				</div>
			</div>

			<div class="relative">
				<input
					placeholder="Password Confirm"
					type={!showPassword ? 'password' : 'text'}
					class="input rounded-md"
					name="passwordConfirm"
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={showPass} class="btn cursor-pointer py-2 px-4 absolute top-0 right-0">
					{#if showPassword}
						<i class="ti ti-eye-off text-xl" />
					{:else}
						<i class="ti ti-eye text-xl" />
					{/if}
				</div>
			</div>
			<div class="px-2">
				<a href="/forgot">forgot password ?</a>
			</div>

			<button class="btn my-1 variant-glass-secondary w-full rounded-lg">Register</button>

			<div class="w-full flex justify-center">
				<a href="/login">Already have An Acount !</a>
			</div>
		</form>
	</div>
</section>
