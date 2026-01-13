import { getTodoById, updateTodo, deleteTodo } from '$lib/server/todos.js';
import { error, fail, redirect } from '@sveltejs/kit';

/* Récupérer la tâche spécifique */
export async function load({ params }) {
    const todo = getTodoById(params.id);

    if(!todo) {
        error(404, 'Todo not found');
    }
    
    return {
        todo
    };
}

export const actions = {
    update: async ({ request, params }) => {
        const data = await request.formData();
        const title = data.get('title');
        const description = data.get('description') || '';
        const category = data.get('category') || '';

        if (!title) {
            return fail(400, { error: 'Title is required'});
        }
    
        const result = updateTodo(
            Number(params.id),
            title, 
            description, 
            category);
        
        if (!result) {
            return fail(404, { error: 'Todo not found' });
        }
        
        return { success: true };
    },

    delete: async ({ params }) => {

        deleteTodo(Number(params.id));

        redirect(303, '/todos');
    }
}