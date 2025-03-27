'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler } from 'react'

interface AddTaskProps {
	handleSubmitNewTodo: FormEventHandler<HTMLFormElement>
	newTask: string
	setNewTask: React.Dispatch<React.SetStateAction<string>>
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	modalOpen: boolean
}

const AddTask: React.FC<AddTaskProps> = ({
	handleSubmitNewTodo,
	newTask,
	setNewTask,
	setModalOpen,
	modalOpen,
}) => {
	return (
		<div>
			<button
				onClick={() => setModalOpen(true)}
				className='btn btn-primary w-full'
			>
				Add new task <AiOutlinePlus className='ml-2' size={18} />
			</button>
			<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
				<form onSubmit={handleSubmitNewTodo}>
					<h3 className='font-bold text-lg'>Add new Task</h3>
					<div className='modal-action'>
						<input
							value={newTask ?? ''}
							onChange={event => setNewTask(event.target.value)}
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
		</div>
	)
}

export default AddTask
