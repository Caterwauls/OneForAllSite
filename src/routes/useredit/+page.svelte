<script>
	let user = {
		profileImage: 'path/to/profile.jpg',
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

<div class="center">
	<div class="card p-4">
		<form>
			<label class="label">
				<span>User name</span>
				<input
					class="input"
					title="Input (text)"
					type="text"
					placeholder={" " + user.username}
					style="margin-bottom: 15px;"
				/>

				<span>Profile Image</span>
				<input
					class="input"
					title="Input (profile-Image)"
					type="file"
					style="margin-bottom: 30px;"
				/>
			</label>
            <label class="label">
				<span>Profile Description</span>
				<textarea
					class="textarea"
					rows="4"
					placeholder={" " + user.profileDescription}
					style="margin-bottom: 30px;"
				/>
			</label>
            <a href="/user" class="btn absolute right-4 bottom-4 bg-blue-500 text-white px-4 py-2 rounded">
				Submit
			</a>
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
		height: 500px;
        position:relative
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
