<script>
	import { isLoggedIn, user, userId } from '$lib/auth';
	import { getUserInfo, setUserInfo } from '$lib/firestore';
	import { goto } from '$app/navigation';

	let nickname = '';
	let profileDescription = '';

	$: {
		if ($isLoggedIn) {
			(async () => {
				const userInfo = await getUserInfo($userId);
				nickname = userInfo.nickname;
				profileDescription = userInfo.profileDescription;
			})();
		}
	}

	async function clickSubmit() {
		await setUserInfo($userId, nickname, profileDescription);
		goto('/user');
	}
</script>

<div class="center">
	<div class="card p-4">
		<form>
			<label class="label">
				<span>닉네임</span>
				<input
					class="input"
					title="Input (text)"
					type="text"
					placeholder="닉네임을 입력하세요"
					bind:value={nickname}
					style="margin-bottom: 15px;"
				/>
			</label>
			<label class="label">
				<span>프로필 설명</span>
				<textarea
					class="textarea"
					bind:value={profileDescription}
					rows="4"
					placeholder="프로필 설명을 입력하세요"
					style="margin-bottom: 30px;"
				/>
			</label>
			<div class="flex">
				<a href="/user" class="btn bg-gray-500 text-white px-4 py-2 rounded">돌아가기</a>
				<div class="flex-1"></div>
				<button class="btn bg-blue-500 text-white px-4 py-2 rounded" on:click={clickSubmit}
					>수정</button
				>
			</div>
		</form>
	</div>
</div>

<style>
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.card {
		width: 400px;
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
