<script>
    import { page } from '$app/state';
    import { emojirs } from './emojis';
</script>

<div class="error">
    <h1>{page.status}</h1>
    <p>{page.error.message}</p>
    <a href="/">← Retour</a>
</div>

<style>
    .error {
        max-width: 500px;
        margin: 5rem auto;
        padding: 2rem;
        text-align: center;
    }
    
    h1 {
        font-size: 4rem;
        margin: 0;
    }
    
    p {
        font-size: 1.2rem;
        margin: 1rem 0;
    }
    
    a {
        color: #4CAF50;
        text-decoration: none;
    }
</style>