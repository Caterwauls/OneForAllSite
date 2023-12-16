<script>
	import { onMount } from 'svelte';
	import { isLoggedIn, user, userId } from '$lib/auth';
	import { getUserInfo, getCurrentUserOutPuts } from '$lib/firestore';
	import AuthenticationForm from '../../AuthenticationForm.svelte';

	export let data;

	let userInfo = {
		nickname: '',
		profileDescription: ''
	};

	let outputs = [];

	onMount(async () => {
		userInfo = await getUserInfo(data.userid);
		outputs = await getCurrentUserOutPuts(data.userid);
	});

	function navigateToUserEdit() {
		goto('/useredit');
	}
</script>

{#if $isLoggedIn}
	<div class="center">
		<div class="card p-4">
			<form>
				<div class="flex items-center space-x-4 profile-info">
					<img src="https://loremflickr.com/360/360" alt="Profile" class="w-16 h-16 rounded-full" />
					<div>
						<p class="text-xl font-semibold">{userInfo.nickname}</p>
						<p class="text-white opacity-50">{$user.email}</p>
					</div>
				</div>
				<div class="mt-4" style="margin-bottom: 50px; margin-top:50px;">
					<p>{userInfo.profileDescription}</p>
				</div>
				<div class="mt-4" style="margin-bottom: 50px;">
					<div class="flex">
						<p class="mr-1">Posts:</p>
						<p style="text-decoration: underline;">{outputs.articleCount}</p>
					</div>
					<div class="flex">
						<p class="mr-1">Comments:</p>
						<p style="text-decoration: underline;">{outputs.commentCount}</p>
					</div>
				</div>
				{#if $userId == data.userid}
					<a
						href="/useredit"
						class="btn absolute right-4 bottom-4 bg-blue-500 text-white px-4 py-2 rounded"
					>
						프로필 수정
					</a>
				{/if}
			</form>
		</div>
	</div>
{:else}
	<AuthenticationForm></AuthenticationForm>
{/if}

<style>
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.card {
		width: 400px;
		height: 500px;
		position: relative;
	}

	.profile-info {
		background-color: #4caf50;
		padding: 1rem;
		border-radius: 0.5rem;
	}
</style>
