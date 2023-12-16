<script>
	import { goto } from '$app/navigation';
	import { addArticle } from '$lib/firestore';

	let title = '';
	let content = '';

	async function submit() {
		if (!title) {
			alert('제목을 입력하세요.');
			return;
		}

		if (!content) {
			alert('내용을 입력하세요.');
			return;
		}

		const newArticleId = await addArticle(title, content);

		goto('/main/article/' + newArticleId);
	}
</script>

<div class="wrapper">
	<div class="container">
		<h1>글쓰기</h1>
		<input class="input" type="text" placeholder="제목" bind:value={title} />
		<textarea class="textarea" rows="4" placeholder="내용을 입력하세요." bind:value={content} />
		<div style="display: flex; justify-content: end;">
			<button type="button" class="btn variant-filled" on:click={submit}>등록</button>
		</div>
	</div>
</div>

<style>
	h1 {
		font-size: 24px;
		margin-bottom: 20px;
	}

	input {
		padding: 6px 14px;
		font-size: 20px;
		margin-bottom: 14px;
	}

	textarea {
		margin-bottom: 10px;
		padding: 8px;
	}

	.container {
		margin-top: 50px;
	}

	.wrapper {
		display: flex;
		justify-content: center;
	}
</style>
