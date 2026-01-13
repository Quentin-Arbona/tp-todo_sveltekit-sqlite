import { getAllTodos, createTodo, toggleCompleted, deleteTodo } from '$lib/server/todos.js';
import { error, fail } from '@sveltejs/kit';

/* Récupérer toutes les tâches */
export async function load() {
    const todos = getAllTodos();

    if(!todos) {
        error(400, 'Not able to get TodoList');
    }
    
    return {
        todos
    };
}

/* Ajouter une tâche */
export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const title = data.get('title');
        const description = data.get('description') || '';
        const category = data.get('category') || '';

        if(!title) {
            return fail(400, {error : 'Title missing'});
        }

        createTodo(title, description, category);

        return { success: true };
    },

    toggle: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');

        if(!id) {
            return fail(400, { error : 'ID missing'})
        }

        const result = toggleCompleted(Number(id));

        if (!result) {
            return fail(404, { error: 'Todo not found' });
        }

        return { success: true };
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');

        if(!id) {
            return fail(400, { error : 'ID missing'})
        }

        deleteTodo(Number(id));

        return { success: true };
    }

}  

    