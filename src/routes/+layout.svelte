<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { auth, isLoggedIn } from '../lib/auth';
	import { signOut } from 'firebase/auth';

	async function logout() {
		await signOut(auth);
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">
					<a href="/">OneForAllSite</a>
				</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $isLoggedIn}
					<a class="btn btn-sm variant-ghost-surface" href="/user" target="_blank" rel="noreferrer">
						User
					</a>
					<button type="button" class="btn variant-filled" on:click={logout}>로그아웃</button>
				{:else}
					You are not logged in
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
