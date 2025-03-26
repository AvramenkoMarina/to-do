import { Todo } from '../types/ToDo'
import Task from './Task'

interface TodoListProps {
	todos: Todo[]
	onUpdate: (updatedTask: Todo) => void
	onDelete: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
	return (
		<div className='overflow-x-auto'>
			<table className='table'>
				{/* head */}
				<thead>
					<tr>
						<th>Tasks</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{todos.map(task => (
						<Task
							key={task.id}
							task={task}
							onUpdate={onUpdate}
							onDelete={onDelete}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TodoList
