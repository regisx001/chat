export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9')
];

export const server_loads = [];

export const dictionary = {
		"/": [~3],
		"/(auth)/login": [~7,[2]],
		"/(auth)/logout": [~8,[2]],
		"/(auth)/register": [~9,[2]],
		"/(app)/room/create": [~6],
		"/(app)/room/[id]": [~4],
		"/(app)/room/[id]/details": [~5]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';