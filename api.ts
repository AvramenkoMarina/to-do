import { Todo } from './app/types/ToDo'

const baseUrl = 'https://jsonplaceholder.typicode.com/todos'

export const getAllTodos = async (): Promise<Todo[]> => {
	const res = await fetch(`${baseUrl}?_limit=10`, { cache: 'no-store' })
	const todos = await res.json()
	return todos
}

export const addTodo = async (todo: Todo): Promise<Todo> => {
	const res = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(todo),
	})

	if (!res.ok) {
		throw new Error('Failed to add todo')
	}

	const newTodo = await res.json()
	return newTodo
}

export const editTodo = async (todo: Todo): Promise<Todo> => {
	const res = await fetch(`${baseUrl}/${todo.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(todo),
	})

	if (!res.ok) {
		throw new Error('Failed to edit todo')
	}

	const updatedTodo = await res.json()
	return updatedTodo
}

export const deleteTodo = async (id: string): Promise<void> => {
	const res = await fetch(`${baseUrl}/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		console.error('Delete failed:', await res.text())
		throw new Error('Failed to delete todo')
	}
}
