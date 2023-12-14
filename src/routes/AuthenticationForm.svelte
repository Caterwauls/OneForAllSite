<script>
	import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	// 클릭 시 input box를 토글하는 함수
	function toggleSignUpForm() {
		const signUpForm = document.getElementById('signup-form');
		signUpForm.classList.toggle('hidden');
	}

	// Submit 버튼 클릭 시 처리하는 함수
	function submitSignUp() {
		// 입력된 ID와 Password를 가져오기
		const idValue = document.getElementById('idInput').value;
		const pwValue = document.getElementById('pwInput').value;

		// 여기에 입력된 ID와 Password를 사용하여 회원가입 처리하는 로직을 추가
		console.log('ID:', idValue);
		console.log('Password:', pwValue);

		// 추가로 필요한 작업을 수행하세요 (예: 서버로 데이터 전송 등)
	}

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		// The signed-in user info.
		const user = result.user;
		console.log(user);
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to OneForAllSite.</h2>
		<!-- Animated Logo -->
		<figure>
			<section class="img-bg" />
			<svg
				version="1.0"
				xmlns="http://www.w3.org/2000/svg"
				width="1280.000000pt"
				height="640.000000pt"
				viewBox="0 0 1280.000000 640.000000"
				preserveAspectRatio="xMidYMid meet"
			>
				<g
					transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
					fill="#000000"
					stroke="none"
				>
					<path
						d="M9638 6075 c-772 -93 -1504 -467 -2317 -1184 -198 -174 -334 -303
-657 -624 -230 -229 -264 -258 -281 -249 -11 6 -100 93 -199 194 -1144 1171
-1886 1664 -2745 1822 -560 103 -1141 38 -1669 -186 -885 -376 -1533 -1167
-1714 -2093 -41 -207 -51 -318 -51 -565 0 -392 54 -719 176 -1065 338 -964
1145 -1627 2164 -1779 634 -95 1337 26 1957 335 243 121 448 250 703 441 321
239 556 450 1061 950 176 175 327 318 334 318 8 0 77 -66 154 -146 172 -179
592 -584 770 -743 820 -731 1442 -1055 2226 -1163 58 -8 194 -12 350 -12 213
0 279 4 400 23 650 100 1205 379 1659 832 457 457 742 1045 823 1699 19 155
16 563 -6 720 -78 561 -275 1067 -568 1457 -95 128 -294 332 -425 435 -364
290 -837 486 -1378 570 -172 26 -594 34 -767 13z m-6331 -1199 c336 -71 676
-233 1010 -481 119 -88 297 -234 413 -339 146 -133 880 -850 880 -860 0 -16
-640 -649 -795 -788 -492 -438 -947 -715 -1375 -839 -202 -58 -321 -74 -565
-74 -190 0 -235 3 -334 23 -590 119 -1022 504 -1210 1077 -160 489 -130 953
90 1385 252 496 706 824 1266 915 63 10 146 13 293 10 172 -3 225 -8 327 -29z
m6863 19 c327 -46 605 -171 841 -378 439 -384 649 -1063 517 -1677 -134 -625
-615 -1131 -1229 -1295 -148 -39 -279 -55 -454 -55 -310 0 -559 62 -870 215
-327 160 -642 391 -1037 761 -248 232 -743 719 -746 734 -3 16 466 495 668
681 682 630 1221 933 1800 1014 130 18 382 18 510 0z"
					/>
				</g>
			</svg>
		</figure>
		<div class="space-y-5">
			<!-- 입력 폼 -->
			<div id="signup-form">
				<input
					type="text"
					placeholder=" Enter your ID"
					class="input"
					id="idInput"
					style="margin-bottom: 10px;"
				/>
				<input type="password" placeholder=" Enter your Password" class="input" id="pwInput" />
			</div>

			<div class="flex justify-center space-x-7">
				<!-- Submit 버튼 -->
				<div class="flex justify-center space-x-2">
					<a class="btn variant-filled" href="/" onclick="submitSignUp()">Submit</a>
				</div>

				<!-- "or" 문구 -->
				<div class="text-center" style="margin-top: 10px;">
					<p>or</p>
				</div>

				<!-- Sign Up 버튼 -->
				<div class="flex justify-center space-x-2">
					<a class="btn variant-filled" href="/signup" onclick="toggleSignUpForm()">Sign Up</a>
				</div>
			</div>
			<div class="flex justify-center space-x-2">
				<a class="btn variant-filled" on:click={signInWithGoogle}>Sign in with Google</a>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
