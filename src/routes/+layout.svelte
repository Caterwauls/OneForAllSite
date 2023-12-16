<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { auth, isLoggedIn, user, userId } from '../lib/auth';
	import { FacebookAuthProvider, signOut } from 'firebase/auth';
	import {goto} from '$app/navigation'

	async function logout() {
		await signOut(auth);
		goto("/");
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
					<a class="btn btn-sm variant-ghost-surface" href="/user/{$userId}">
						{$user.email}
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
