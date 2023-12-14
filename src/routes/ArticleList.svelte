<script>
	import { goto } from '$app/navigation';

	let boards = [
		{ id: 1, name: 'Board 1', creator: 'User1', profileImage: 'https://loremflickr.com/300/300' },
		{ id: 2, name: 'Board 2', creator: 'User2', profileImage: 'https://loremflickr.com/300/300' },
		{ id: 3, name: 'Board 3', creator: 'User3', profileImage: 'https://loremflickr.com/300/300' },
		{ id: 4, name: 'Board 4', creator: 'User4', profileImage: 'https://loremflickr.com/300/300' },
		{ id: 7, name: 'Board 7', creator: 'User7', profileImage: 'https://loremflickr.com/300/300' },
		{ id: 5, name: 'Board 5', creator: 'User5', profileImage: 'https://loremflickr.com/300/300' },
		{ id: 6, name: 'Board 6', creator: 'User6', profileImage: 'https://loremflickr.com/300/300' }
		// Add more boards as needed
	];

	let highlightedBoard = null;
</script>

<div class="center">
	<div class="bg-card">
		<div class="wrapper">
			<div class="active-list-label p-3 mb-4 text-center font-bold bg-gray-200 text-black">
				게시물 (최신순)
			</div>
			<div class="list-card p-4 bg-white overflow-y-auto relative z-10">
				<ul class="list p-4">
					{#each boards as board (board.id)}
						<a href="/main/article/{board.id}">
							<li
								class="flex items-center space-x-4 mb-1"
								on:mouseenter={() => (highlightedBoard = board.id)}
								on:mouseleave={() => (highlightedBoard = null)}
								class:selected={highlightedBoard === board.id}
							>
								<span class="rounded-full overflow-hidden bg-gray-300 w-10 h-10">
									<img src={board.profileImage} alt="Profile" class="w-full h-full object-cover" />
								</span>
								<span class="flex-auto text-lg text-center text-black">{board.name}</span>
								<span class="flex-auto text-sm text-right text-gray-600">{board.creator}</span>
							</li>
						</a>
						{#if board.id !== boards.length}
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
