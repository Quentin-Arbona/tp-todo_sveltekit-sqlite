<script>

    let todos = $state([]);
    let newTodoTitle = $state('');

    let editingId = $state(null);
    let editingTitle = $state('');

    // Charger tous les todos depuis l'API
    async function loadTodos() {
        const response = await fetch('/api/todos');

        todos = await response.json();
    }

    // Ajouter un nouveau todo
    async function addTodo() {
        // Si le titre est vide, ne rien faire
        if(!newTodoTitle.trim()) return;

        // Envoyer le nouveau todo à l'API
        await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTodoTitle
            })
        });

        // Vider l'input
        newTodoTitle = '';

        // Recharger la liste pour afficher le nouveau todo
        await loadTodos();
    }

    async function toggleTodo(id) {
        await fetch(`/api/todos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true })
        });

        await loadTodos();
    }

    function startEditing(todo) {
        editingId = todo.id;
        editingTitle = todo.title;
    }

    async function saveEditing() {
        await fetch(`/api/todos/${editingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title : editingTitle })
        });

        editingId = null;

        await loadTodos();
    }
    

    async function deleteTodo(id) {
        await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        });

        await loadTodos();
    }

    // Charger les todos au démarrage
    $effect(() => {
        loadTodos();
    });
</script>

<h1>Todo List</h1>

<!-- Formulaire : on intercepte la soumission avec onsubmit -->
<form onsubmit={(e) => { 
  e.preventDefault(); // Pour empêcher le rechargement de page
  addTodo(); // Appel de la fonction
 }}>
    <!-- bind:value pour lier l'input à newTodoTitle -->
    <input 
        bind:value={newTodoTitle}
        placeholder="Nouvelle tâche..."
    />
    <button type="submit">+</button>
</form>

<ul>
    {#each todos as todo}
        <li>
            <!-- Checkbox -->
            <input 
                type="checkbox"
                checked={todo.completed === 1}
                onchange={() => toggleTodo(todo.id)} 
            />

            <!-- Titre (barré si completed) -->
             {#if editingId === todo.id }
                <input
                    bind:value={editingTitle}
                    onblur={saveEditing}
                    onkeydown={(e) => {
                        if (e.key === 'Enter') saveEditing();
                    }}
                    autofocus
                >
            {:else}
                <span class:completed={todo.completed === 1}>
                    {todo.title}
                </span>
            {/if}

            <!-- Bouton d'édition -->
            {#if editingId === todo.id }
                <!-- Si la tâche est en cours d'édition, on a un bouton valider -->
                <button onclick={() => saveEditing()} title="Valider">valider</button>
            {:else}
                <!-- Si la tâche n'est pas en cours d'édition, on a un bouton éditer -->
                <button onclick={() => startEditing(todo)} title="Éditer">edit</button>
            {/if}

            <!-- Boutton de suppression -->
            <button onclick={() => deleteTodo(todo.id)} title="Supprimer">x</button>
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

    button[title="Valider"] {
        background-color: green;
        color: white;
        font-weight: bold;
    }

    button[title="Éditer"] {
        background-color: grey;
        color: white;
        font-weight: bold;
    }

    button[title="Supprimer"] {
        background-color: red;
        color: white;
        font-weight: bold;
    }
</style>