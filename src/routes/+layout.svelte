<script lang="ts">
	// @ts-ignore
	// import eventsource from 'eventsource';
	import 'cross-fetch/polyfill';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { Toast } from '@skeletonlabs/skeleton';
</script>

<slot />

<Toast max={1} />
