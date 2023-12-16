<script>
	export let userId = '';
	export let iconSize = 20;
	import { getUserInfo } from '$lib/firestore';

	$: {
		(async () => {
			nickname = '불러오는 중';
			const userInfo = await getUserInfo(userId);
			nickname = userInfo.nickname;
		})();
	}

	let nickname = '불러오는 중';
</script>

<div class="flex items-center">
	<a class="flex" href="/user/{userId}">
		<span
			class="rounded-full overflow-hidden bg-gray-300"
			style="width: {iconSize}px; height: {iconSize}px"
		>
			<img
				src="https://loremflickr.com/300/300?random={userId}"
				alt="Profile"
				class="w-full h-full object-cover"
			/>
		</span>
		<div class="text-black ml-1.5">{nickname}</div>
	</a>
</div>
