<script>
	import ArticleList from './ArticleList.svelte';
	import AuthenticationForm from './AuthenticationForm.svelte';
	import { isLoggedIn } from '../lib/auth';
</script>

{#if $isLoggedIn}
	<ArticleList />
{:else}
	<AuthenticationForm />
{/if}
