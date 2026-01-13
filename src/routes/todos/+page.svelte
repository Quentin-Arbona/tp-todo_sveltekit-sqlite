<script>

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
             <form method="POST" action="?/toggle">
                <input type="hidden" name="id" value={todo.id}/>
                <button type="submit">
                    {todo.completed === 1 ? 'v' : 'o'}
                </button>
            </form>

            <!-- Titre de la todo -->
            <span class:completed={todo.completed === 1}>
                {todo.title}
            </span>

            <!-- Boutton de suppression -->
             <form method="POST" action="?/delete">
                <input type="hidden" name="id" value={todo.id} />
                <button aria-label="Delete button">x</button>
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

        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        margin: 5px 0;
    }

    li {
        list-style: none;
        padding: 10px;
        border: 1px solid #ddd;
        margin: 5px 0;
    }


</style>

