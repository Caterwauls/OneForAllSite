<script>
	import { onMount } from 'svelte';
	import { getArticle, getComments, addComment } from '$lib/firestore';

	export let data;

	let articleData = null;
	let comments = [];

	onMount(async () => {
		articleData = await getArticle(data.articleid);
		comments = await getComments(data.articleid);
	});

	let commentText = '';

	async function submitComment() {
		if (!commentText.trim()) {
			alert('내용을 입력하세요.');
			return;
		}

		const newComment = await addComment(data.articleid, commentText);
        comments = [...comments, newComment];
		commentText = '';
	}

	function submitLike() {}
</script>

{#if articleData}
	<div class="center">
		<div class="bg-card">
			<div class="post-container p-4 bg-white rounded">
				<h1 class="text-2xl font-bold mb-4 text-black">{articleData.title}</h1>
				<div class="flex justify-between mb-4" style="margin-top: 30px;">
					<p class="text-gray-600">작성자: {articleData.author}</p>
					<p class="text-gray-600">조회수: {articleData.readCount}</p>
				</div>
				<p class="text-gray-600 mb-4" style="margin-top: 50px;">{articleData.content}</p>
				<div class="flex justify-between items-center space-x-4 mb-4" style="margin-top: 50px;">
					<button class="chip variant-filled hover:variant-filled-primary" on:click={submitLike}>
						<span>{articleData.upvote}</span>
						<span>좋아요</span>
					</button>
				</div>
				<div class="comments" style="margin-top: 20px;">
					<h2 class="text-lg font-bold mb-2 text-black">댓글</h2>
					{#if comments.length > 0}
						{#each comments as comment}
							<div class="comment-item p-2 mb-2 bg-gray-100 rounded">
								<p class="text-sm text-black">{comment.content}</p>
								<p class="text-xs text-gray-500">작성자: {comment.author}</p>
							</div>
						{/each}
					{:else}
						등록된 댓글이 없습니다.
					{/if}
				</div>
				<div class="comment">
					<textarea
						bind:value={commentText}
						placeholder="댓글을 입력하세요..."
						class="w-full p-2 mb-2 text-black"
					></textarea>
					<button
						on:click={submitComment}
						class="bg-blue-500 text-white px-4 py-2 rounded float-right"
						style="margin-top: 30px;">등록</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90vh;
	}

	.bg-card {
		background: linear-gradient(
			115.24272489234886deg,
			rgba(85, 189, 120, 1) 14.535047743055555%,
			rgba(71, 149, 137, 1) 38.694118923611114%,
			rgba(49, 86, 166, 1) 78.2421875%,
			rgba(42, 65, 176, 1) 92.14192708333333%
		);
		z-index: 0;
		padding: 40px 40px;
		border-radius: 30px;
	}

	.post-container {
		width: 1000px;
		max-height: none;
		overflow-y: auto;
	}

	.comments {
		margin-top: 20px;
	}

	.comment {
		border: 1px solid #ccc;
		padding: 8px;
	}

	.comment textarea {
		resize: none;
	}

	.comment-item {
		border: 1px solid #ccc;
		padding: 8px;
	}
</style>
