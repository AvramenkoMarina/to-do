'use client'

import { MdModeEdit } from 'react-icons/md'
import { Todo } from '../types/ToDo'
import { FaRegTrashAlt } from 'react-icons/fa'
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { deleteTodo, editTodo } from '@/api'

interface TaskProp {
	task: Todo
	onUpdate: (updatedTask: Todo) => void
	onDelete: (id: string) => void
}

const Task: React.FC<TaskProp> = ({ task, onUpdate, onDelete }) => {
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
	const [taskToEdit, setTaskToEdit] = useState<string>(task.title)
	const [openModelDelete, setOpenModelDelete] = useState<boolean>(false)

	const handleEditTodo: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()

		if (task.id === undefined) {
			console.error('Task ID is undefined')
			return
		}

		const updatedTask = {
			id: task.id,
			title: taskToEdit,
			completed: task.completed,
		}

		try {
			const response = await editTodo(updatedTask)
			onUpdate(response)
			setOpenModalEdit(false)
		} catch (error) {
			console.error('Error editing task:', error)
		}
	}

	const handleDeleteTask = async (id: string) => {
		try {
			await deleteTodo(id)
			onDelete(id)
			setOpenModelDelete(false)
		} catch (error) {
			console.error('Error deleting task:', error)
		}
	}

	return (
		<tr key={task.id}>
			<td className='w-fully'>{task.title}</td>
			<td className='flex gap-5'>
				<MdModeEdit
					onClick={() => setOpenModalEdit(true)}
					cursor='pointer'
					className='text-blue-500'
					size={20}
				/>
				<Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
					<form onSubmit={handleEditTodo}>
						<h3 className='font-bold text-lg'>Edit task</h3>
						<div className='modal-action'>
							<input
								value={taskToEdit}
								onChange={event => setTaskToEdit(event.target.value)}
								type='text'
								placeholder='Type here'
								className='input input-bordered w-full'
							/>
							<button type='submit' className='btn'>
								Submit
							</button>
						</div>
					</form>
				</Modal>
				<FaRegTrashAlt
					onClick={() => setOpenModelDelete(true)}
					cursor='pointer'
					className='text-red-500'
				/>
				<Modal modalOpen={openModelDelete} setModalOpen={setOpenModelDelete}>
					<h3 className='text-lg'>
						Are you sure, you want to delete this task?
					</h3>
					<div className='modal-action'>
						<button
							onClick={() => handleDeleteTask(task.id?.toString() ?? '')}
							className='btn'
						>
							Yes
						</button>
					</div>
				</Modal>
			</td>
		</tr>
	)
}

export default Task
