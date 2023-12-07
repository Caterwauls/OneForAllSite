<script>
	let email = '';
	let password = '';
	let username = '';
	let profileImage = '';
	let profileDescription = '';

	const handleSubmit = (event) => {
		event.preventDefault();
		// 여기에서 입력값을 사용하여 필요한 작업을 수행합니다.
		console.log('Form submitted:', { email, password, username, profileImage, profileDescription });
	};
</script>

<div class="center">
	<div class="card p-4">
		<form on:submit={handleSubmit}>
			<div class="flex justify-center space-x-2" style="margin-bottom: 40px;">Sign Up</div>
			<label class="label">
				<span>Input</span>
				<input
					bind:value={email}
					class="input"
					title="Input (email)"
					type="email"
					placeholder=" john@example.com"
					autocomplete="email"
					style="margin-bottom: 10px;"
				/>
				<input
					bind:value={password}
					class="input"
					title="Input (password)"
					type="password"
					placeholder=" password"
					style="margin-bottom: 30px;"
				/>
			</label>

			<label class="label">
				<span>User name</span>
				<input
					bind:value={username}
					class="input"
					title="Input (text)"
					type="text"
					placeholder=" John Doe"
					style="margin-bottom: 15px;"
				/>

				<span>Profile Image</span>
				<input
					bind:value={profileImage}
					class="input"
					title="Input (profile-Image)"
					type="file"
					style="margin-bottom: 30px;"
				/>
			</label>

			<label class="label">
				<span>Profile Description</span>
				<textarea
					bind:value={profileDescription}
					class="textarea"
					rows="4"
					placeholder=" Lorem ipsum dolor sit amet consectetur adipisicing elit."
					style="margin-bottom: 30px;"
				/>
			</label>

			<div class="flex justify-end">
				<button type="submit" class="btn variant-filled">Submit</button>
			</div>
		</form>
	</div>
</div>

<style>
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh; /* 화면 전체 높이에 가운데 정렬하려면 필요 */
	}

	.card {
		width: 500px;
		height: 600px;
		/* 다른 스타일들 */
	}
</style>
