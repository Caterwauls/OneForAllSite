<script>
	import { isLoggedIn, user, userId } from '$lib/auth';
	import { getUserInfo } from '$lib/firestore';
	import AuthenticationForm from '../AuthenticationForm.svelte';

	let abcd = {
		profileImage: 'https://loremflickr.com/360/360',
		username: 'JohnDoe',
		email: 'john@example.com',
		profileDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		postCount: 10,
		commentCount: 25
	};

	let userInfo = {
		nickname: '',
		profileDescription: ''
	};

	$: {
		if ($isLoggedIn) {
			(async () => {
				userInfo = await getUserInfo($userId);
			})();
		}
	}

	function navigateToUserEdit() {
		// UserEdit 페이지로 이동
		goto('/useredit');
	}
</script>

{#if $isLoggedIn}
	<div class="center">
		<div class="card p-4">
			<form>
				<div class="flex items-center space-x-4 profile-info">
					<!-- 프로필 사진 -->
					<img src={abcd.profileImage} alt="Profile" class="w-16 h-16 rounded-full" />

					<!-- 유저 정보 -->
					<div>
						<p class="text-xl font-semibold">{userInfo.nickname}</p>
						<p class="text-white opacity-50">{$user.email}</p>
					</div>
				</div>

				<!-- 프로필 설명 -->
				<div class="mt-4" style="margin-bottom: 50px; margin-top:50px;">
					<p>{userInfo.profileDescription}</p>
				</div>

				<!-- 글 및 댓글 정보 -->
				<div class="mt-4" style="margin-bottom: 50px;">
					<p>Posts: {abcd.postCount}</p>
					<p>Comments: {abcd.commentCount}</p>
				</div>
				<a
					href="/useredit"
					class="btn absolute right-4 bottom-4 bg-blue-500 text-white px-4 py-2 rounded"
				>
					프로필 수정
				</a>
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

	button {
		cursor: pointer;
	}
</style>
