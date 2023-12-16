<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import {
		getArticle,
		getComments,
		addComment,
		getArticles,
		getCommentCount
	} from '$lib/firestore';
	import Author from './Author.svelte';

	let articleList = [];
	let commentCounts = [];

	onMount(async () => {
		articleList = await getArticles();

		for (const article of articleList) {
			commentCounts[article.id] = await getCommentCount(article.id);
		}
	});

	let highlightedBoard = null;

	function goToWritePage() {
		goto('/main/write');
	}
</script>

<div class="center">
	<div class="bg-card">
		<div class="wrapper">
			<div
				class="active-list-label p-3 mb-4 flex justify-between items-center font-bold bg-gray-200 text-black"
			>
				<span>게시물 (최신순)</span>
				<button
					on:click={goToWritePage}
					class="text-white bg-black px-3 py-1 rounded hover:bg-gray-700 transition-colors"
				>
					글쓰기
				</button>
			</div>
			<div class="list-card p-4 bg-white overflow-y-auto relative z-10">
				<ul class="list p-4">
					{#each articleList as article}
						<a href="/main/article/{article.id}">
							<li
								class="flex items-center mb-1"
								on:mouseenter={() => (highlightedBoard = article.id)}
								on:mouseleave={() => (highlightedBoard = null)}
								class:selected={highlightedBoard === article.id}
							>
								<span class="text-lg text-center text-black">{article.data.title}</span>
								<div class="flex-1"></div>
								<span class="text-sm text-right text-gray-600"
									>댓글 {commentCounts[article.id]}개</span
								>
								<Author iconSize={40} userId={article.data.author}></Author>
							</li>
						</a>
						{#if article.id !== articleList.length}
							<hr class="border-gray-300 my-2" />
						{/if}
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.active-list-label {
		width: 800px;
		margin: 0 auto;
		border-radius: 10px 10px 0px 0px;
	}

	.list-card {
		width: 800px;
		max-height: 700px;
		border-radius: 0px 0px 10px 10px;
		background-color: #ffffff;
		z-index: 1;
	}

	.list {
		list-style-type: none;
		padding: 0;
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

	li {
		padding: 15px;
		transition: background-color 0.3s ease;
		border-radius: 5px;
	}

	li:hover {
		background-color: #f0f0f0;
		cursor: pointer;
	}

	hr {
		border: 0;
		height: 1px;
		background-color: #ccc;
	}
</style>
