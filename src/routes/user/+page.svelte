<script>
	import { isLoggedIn } from '../../lib/auth';
	import AuthenticationForm from '../AuthenticationForm.svelte';

	let user = {
		profileImage: 'https://loremflickr.com/360/360',
		username: 'JohnDoe',
		email: 'john@example.com',
		profileDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		postCount: 10,
		commentCount: 25
	};

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
					<img src={user.profileImage} alt="Profile" class="w-16 h-16 rounded-full" />

					<!-- 유저 정보 -->
					<div>
						<p class="text-xl font-semibold">{user.username}</p>
						<p class="text-gray-500">{user.email}</p>
					</div>
				</div>

				<!-- 프로필 설명 -->
				<div class="mt-4" style="margin-bottom: 50px; margin-top:50px;">
					<p>{user.profileDescription}</p>
				</div>

				<!-- 글 및 댓글 정보 -->
				<div class="mt-4" style="margin-bottom: 50px;">
					<p>Posts: {user.postCount}</p>
					<p>Comments: {user.commentCount}</p>
				</div>
				<a
					href="/useredit"
					class="btn absolute right-4 bottom-4 bg-blue-500 text-white px-4 py-2 rounded"
				>
					Edit Profile
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
		/* 다른 스타일들 */
	}

	.profile-info {
		background-color: #4caf50;
		padding: 1rem;
		border-radius: 0.5rem;
		justify-content: space-between; /* 프로필 정보와 버튼 사이의 간격을 벌리기 위해 추가 */
	}

	button {
		cursor: pointer;
	}
</style>
