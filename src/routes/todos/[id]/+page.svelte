<script>
    import { enhance } from '$app/forms';
    export let data;
    export let form;
</script>

<div class="container">
    <a href="/todos">◀️ Retour à la liste</a>

    <h1>Détails de la tâche</h1>

    <!-- Infos sur la tâche -->
    <section class="card">
        <h2>Informations</h2>

        <div class="info">
            <span>Statut</span>
            <strong>{data.todo.completed === 1 ? '✅ Complétée' : '⏳ En cours'}</strong>
        </div>

        <div class="info">
            <span>📅 Créée le</span>
            <strong>{data.todo.created_at}</strong>
        </div>
    </section>

    <!-- Formulaire de modification -->
     <section class="card">
        <h2>✏️ Modifier</h2>

        <form method="POST" action="?/update" use:enhance>
            {#if form?.error}
                <p class="error">{form.error}</p>
            {/if}
            
            {#if form?.success}
                <p class="success">✅ Tâche mise à jour avec succès</p>
            {/if}
            
           
            <label for="title">
                📍 Titre
                <input 
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={form?.title ?? data.todo.title}
                />
            </label>

            <label for="category">
                📂 Catégorie
                <input 
                    id="category"
                    name="category"
                    type="text"
                    value={form?.category ?? data.todo.category ?? ''}
                />
            </label>
            
            <label for="description">
                💬 Description
                <textarea 
                    id="description"
                    name="description"
                    rows="4"
                >{form?.description ?? data.todo.description ?? ''}</textarea>
            </label>
            
            <button type="submit" class="btn btn-primary">
                💾 Enregistrer
            </button>
        </form>
     </section>

        <!-- Formulaire de suppression -->
    <section class="card danger">
        <form method="POST" action="?/delete" use:enhance class="danger">
            <h2>⚠️ Attention</h2>
            <p>La suppression est définitive, aucun retour en arrière possible</p>
            <button type="submit" class="btn btn-danger"
                onclick={(e) => {
                    if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
                        e.preventDefault();}
                }}
            >
                🗑️ Supprimer la tâche
            </button>
        </form>
    </section>
</div>

<style>
    
    /* Général */

    .container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1rem;
    }

    h1 {
        margin-bottom: 1rem 0 2rem 0;
    }

    h2 {
        margin-top: 0;
        font-size: 1.2rem;
    }

    a {
        display: inline-block;
        margin-bottom: 1rem;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    /* Cartes */

    .card {
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .card.danger {
        background: #fff5f5;
        border-color: #ffcccc;
    }


    /* Infos */

    .info {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid #eee;
    }

    /* Formulaires */
    
    label {
        display: block;
        margin-bottom: 1rem;
        font-weight: 600;
        font-size: 0.9rem;
    }

    input,
    textarea {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-family: inherit;
    }

    /* Boutons */

    .btn {
        padding: 10px 12px;
        border-radius: 5px;
        border: none;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
    }

    .btn-primary {
        background: #4CAF50;
        color: white;
    }
    
    .btn-primary:hover {
        background: #45a049;
        transform:translateY(-1px);
    }

    .btn-danger {
        background: rgb(199, 0, 0);
        color: white;
    }

    .btn-danger:hover {
        background-color: rgb(231, 11, 11);
        transform:translateY(-1px);
    }


</style>