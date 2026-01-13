
import db from './database.js';

export function getAllTodos() {
  return db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all();
}

export function getTodoById(id) {
  return db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
}

export function createTodo(title, description, category = '') {
  const stmt = db.prepare('INSERT INTO todos (title, description, category) VALUES (?, ?, ?)');
  const info = stmt.run(title, description, category);
  return getTodoById(info.lastInsertRowid);
}

export function updateTodo(id, title, description, category) {
  db.prepare('UPDATE todos SET title = ?, description = ?, category = ? WHERE id = ?')
    .run(title, description, category, id);
  return getTodoById(id);
}

export function toggleCompleted(id) {
  const todo = getTodoById(id);
  if (!todo) return null;
  
  const newCompleted = todo.completed === 1 ? 0 : 1;
  db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
    .run(newCompleted, id);
  
  return getTodoById(id);
}

export function deleteTodo(id) {
  return db.prepare('DELETE FROM todos WHERE id = ?').run(id);
}