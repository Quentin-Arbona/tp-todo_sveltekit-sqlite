import { error, json } from '@sveltejs/kit';
import { getAllTodos, createTodo, toggleCompleted, deleteTodo } from '$lib/server/todos.js';

/* Récupérer toutes les tâches */
export async function GET() {
    const todos = getAllTodos();

    if(!todos) {
        error(400, 'Impossible de récupérer la Todo List');
    }
    
    return json(todos);
}

/* Ajouter une tâche */
export async function POST({ request }) {
    const {title} = await request.json()

    if(!title) {
        error(400, 'Le titre de la tâche est requis');
    }

    const newTodo = createTodo(title);

    return json(newTodo, { status: 201 });
}