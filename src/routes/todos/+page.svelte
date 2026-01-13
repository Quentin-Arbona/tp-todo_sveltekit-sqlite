<script>

import { enhance } from '$app/forms';
export let data;
export let form;

</script>

<h1>Todo List</h1>

<!-- Formulaire create todo -->
<form method="POST" action="?/create">
    
    <!-- Si erreur lors de la création -->
     {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}

    <label>Ajouter une tâche
        <input 
            name="title"
            placeholder="Titre de la tâche..."
            required
            value={form?.title ?? ''}
        />
        <button type="submit">+</button>
    </label>
</form>

<ul>
    {#each data.todos as todo}
        <li>
            <!-- Formulaire toggle completed -->
             <form method="POST" action="?/toggle" style="display:contents;" use:enhance>
                <input type="hidden" name="id" value={todo.id}/>
                <input type="checkbox" checked={todo.completed === 1} onchange={(e) => e.target.form.requestSubmit()} />
            </form>

            <!-- Titre de la todo -->
            <span class:completed={todo.completed === 1}>
                {todo.title} 
            </span>

            <!-- Lien vers la page de détails de la tâche -->
            <a href="/todos/{todo.id}">
                <i>voir +</i>
            </a>

            <!-- Boutton de suppression -->
             <form method="POST" action="?/delete" style="display:contents;">
                <input type="hidden" name="id" value={todo.id} />
                <button class="delete-button" aria-label="Delete button">❌</button>
            </form>
            

        </li>
    {/each}
</ul>

<style>
    .completed {
        text-decoration: line-through;
        color: grey;
    }

    ul {
       list-style: none;
        padding: 0;
    }

    li {
        list-style: none;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        margin: 5px 0;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    a {
        font-size: 0.875rem;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

</style>

