<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/todos">TodoList</a>
	<a href="/weather">Weather</a>
</nav>

{@render children()}

<style>

	nav {
		margin: 10px;
		padding: 20px;
		font-size: 16px;
		border-bottom: 2px solid black;
	}

	a {
		text-decoration: none;
		padding: 10px;
		display: inline-block;
		transition: transform 0.2s ease;
	}

	a:hover {
		transform: scale(1.1);
		color: #007bff;
		background-color: #f0f0f0;
	}

</style>