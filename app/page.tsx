'use client'

import { useEffect, useState, FormEventHandler } from 'react'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'
import { getAllTodos, addTodo } from '@/api'
import { Todo } from './types/ToDo'

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [newTask, setNewTask] = useState<string>('')
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	useEffect(() => {
		const fetchTodos = async () => {
			const data = await getAllTodos()
			setTodos(data)
		}

		fetchTodos()
	}, [])

	const handleSubmitNewTodo: FormEventHandler<
		HTMLFormElement
	> = async event => {
		event.preventDefault()

		if (!newTask.trim()) return

		const newTodo = {
			title: newTask,
			completed: false,
		}

		try {
			const addedTodo = await addTodo(newTodo)
			setTodos(prevTodos => [...prevTodos, addedTodo])
			setNewTask('')
			setModalOpen(false)
		} catch (error) {
			console.error('Error adding task:', error)
		}
	}

	const updateTodo = (updatedTask: Todo) => {
		setTodos(prevTodos =>
			prevTodos.map(todo => (todo.id === updatedTask.id ? updatedTask : todo))
		)
	}

	const handleDeleteTask = (id: string) => {
		setTodos(prevTasks => prevTasks.filter(task => task.id !== +id))
	}

	return (
		<main className='max-w-4xl mx-auto mt-4'>
			<div className='text-center my-5 flex flex-col gap-4'>
				<h1 className='text-2xl font-bold'>Todo List App</h1>
				<AddTask
					handleSubmitNewTodo={handleSubmitNewTodo}
					newTask={newTask}
					setNewTask={setNewTask}
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
				/>
			</div>
			<TodoList
				todos={todos}
				onUpdate={updateTodo}
				onDelete={handleDeleteTask}
			/>
		</main>
	)
}
