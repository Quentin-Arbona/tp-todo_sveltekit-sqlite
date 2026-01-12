import { error, json } from '@sveltejs/kit';
import { getTodoById, updateTodo, toggleCompleted, deleteTodo } from '$lib/server/todos.js';

export async function GET({ params }) {
    const id = parseInt(params.id);
    const todo = getTodoById(id);

    if(!todo){
        throw error(400, "La tâche n'a pas pu être récupérée");
    }

    return json(todo);
}

export async function PATCH({ params, request }) {
    const id = parseInt(params.id);
    const data = await request.json();

    let updatedTodo;

    if ('completed' in data) {
        updatedTodo = toggleCompleted(id);
    }
    else if ('title' in data) {
        const { title } = data;
        updatedTodo = updateTodo(id, title);
    }

    if(!updatedTodo) {
        throw error(404, 'Todo non trouvé'); 
    }

    return json(updatedTodo);
}

export async function DELETE({ params }) {
    const id = parseInt(params.id);
    deleteTodo(id);

    return new Response(null, {status: 204});
}