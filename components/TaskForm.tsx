import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import OptionGroup from '@/components/OptionGroup';
import FormSubmission from '@/components/FormSubmission';

interface TaskFormProps {
	taskForm: {
		form: {
			title: string;
			description: string;
			duedate: string;
			tasktype: string;
			status: string;
			priority: string;
			effort: string;
		};
		handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
		handleOptionClick: (name: string, value: string) => void;
		handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
		taskId: number | null;
	};
}

const TaskForm: React.FC<TaskFormProps> = ({ taskForm }) => {
	const { form, handleChange, handleOptionClick, handleSubmit, taskId } = taskForm;

	return (
		<div className="max-w-3xl mx-auto mt-20 space-y-6">
			<h1 className="text-4xl font-extrabold">
				{taskId === null ? 'Create new task' : 'Edit task'}
			</h1>
			<form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
				<FormInput
					label="Task title"
					name="title"
					value={form.title}
					onChange={handleChange}
					placeholder="eg. Optimize database queries (required)"
					required
				/>
				<FormTextArea
					value={form.description}
					onChange={handleChange}
					placeholder="eg. Improve performance by analyzing and optimizing slow or inefficient database queries. Apply best practices and indexing where needed. (optional)"
				/>
				<OptionGroup name="status" options={['Not started', 'In progress', 'In review', 'Completed']} form={form} handleOptionClick={handleOptionClick} />
				<OptionGroup name="priority" options={['Low', 'Medium', 'High']} form={form} handleOptionClick={handleOptionClick} />
				<OptionGroup name="effort" options={['Low', 'Medium', 'High']} form={form} handleOptionClick={handleOptionClick} />
				<FormInput
					label="Due date"
					name="duedate"
					value={form.duedate}
					onChange={handleChange}
					placeholder="YYYY-MM-DD (optional)"
				/>
				<FormInput
					label="Task type"
					name="tasktype"
					value={form.tasktype}
					onChange={handleChange}
					placeholder="eg. Design (optional)"
				/>
				<FormSubmission />
			</form>
		</div>
	);
};

export default TaskForm;
