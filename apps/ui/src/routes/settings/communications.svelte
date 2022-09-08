<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ stuff }) => {
		try {
			return {
				props: {
					...stuff
				}
			};
		} catch (error: any) {
			return {
				status: 500,
				error: new Error(error)
			};
		}
	};
</script>

<script lang="ts">
	import { del, post } from '$lib/api';
	import { t } from '$lib/translations';
	import { errorNotification } from '$lib/common';
	import Menu from './_Menu.svelte';

	let loading = {
		save: false
	};
	let isModalActive = false;

</script>

<div class="flex space-x-1 p-6 font-bold">
	<div class="mr-4 text-2xl tracking-tight">{$t('index.settings')}</div>
</div>
<div class="mx-auto w-full">
	<div class="flex flex-row">
		<Menu />
		<div class="grid grid-flow-row gap-2 py-4">
			<div class="flex space-x-1 pb-6">
				<div class="title font-bold">Communications</div>
			</div>
			<div class="grid grid-flow-col gap-2 px-10">
			</div>
		</div>
	</div>
</div>
