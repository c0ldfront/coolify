<script lang="ts">
	import { post } from '$lib/api';
	import { page } from '$app/stores';
	import { status } from '$lib/store';
	import CopyPasswordField from '$lib/components/CopyPasswordField.svelte';
	import Explainer from '$lib/components/Explainer.svelte';
	import Setting from '$lib/components/Setting.svelte';

	import { browser } from '$app/env';
	import { t } from '$lib/translations';
	import { errorNotification, getDomain } from '$lib/common';


	export let readOnly: any;
	export let service: any;
	export let settings: any;

	const { id } = $page.params;
	const { ipv4, ipv6 } = settings;

	let sshLoading = false;

	// async function changeSettings(name: any) {
	// 	if (sshLoading) return;
	// 	if ($status.service.isRunning) {
	// 		sshLoading = true;
	// 		let sshEnabled = service.gitea.sshEnabled;

	// 		if (name === 'sshEnabled') {
	// 			sshEnabled = !sshEnabled;
	// 		}

	// 		try {
	// 			// const {
	// 			// 	publicPort,
	// 			// 	ftpUser: user,
	// 			// 	ftpPassword: password
	// 			// } = await post(`/services/${id}/wordpress/ftp`, { sshEnabled });
	// 			service.gitea.sshEnabled = sshEnabled;
	// 		} catch (error) {
	// 			return errorNotification(error);
	// 		} finally {
	// 			sshLoading = false;
	// 		}
	// 	}
	// }
</script>


<div class="flex space-x-1 py-5 font-bold">
	<div class="title">MySQL</div>
</div>
<div class="space-y-2">
	<div class="grid grid-cols-2 items-center lg:px-10 px-2">
		<label for="mysqlUser">{$t('forms.username')}</label>
		<CopyPasswordField
			name="mysqlUser"
			id="mysqlUser"
			value={service.gitea.mysqlUser}
			readonly
			disabled
		/>
	</div>
	<div class="grid grid-cols-2 items-center lg:px-10 px-2">
		<label for="mysqlPassword">{$t('forms.password')}</label>
		<CopyPasswordField
			id="mysqlPassword"
			isPasswordField
			readonly
			disabled
			name="mysqlPassword"
			value={service.gitea.mysqlPassword}
		/>
	</div>
	<div class="grid grid-cols-2 items-center lg:px-10 px-2">
		<label for="mysqlDatabase">{$t('index.database')}</label>
		<input
			class="w-full"
			name="mysqlDatabase"
			id="mysqlDatabase"
			required
			readonly={readOnly}
			disabled={readOnly}
			bind:value={service.gitea.mysqlDatabase}
			placeholder="{$t('forms.eg')}: gitea_db"
		/>
	</div>
	<!-- <div class="grid grid-cols-2 items-center lg:px-10 px-2">
		<label for="mysqlRootUser">{$t('forms.root_db_user')}</label>
		<CopyPasswordField
			id="mysqlRootUser"
			readonly
			disabled
			name="mysqlRootUser"
			value={service.gitea.mysqlRootUser}
		/>
	</div> -->
	<div class="grid grid-cols-2 items-center lg:px-10 px-2">
		<label for="mysqlRootUserPassword">{$t('forms.root_db_password')}</label>
		<CopyPasswordField
			id="mysqlRootUserPassword"
			isPasswordField
			readonly
			disabled
			name="mysqlRootUserPassword"
			value={service.gitea.mysqlRootUserPassword}
		/>
	</div>
</div>
