'use client'
import React from 'react';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import OptionGroup from '@/components/OptionGroup';
import FormSubmission from '@/components/FormSubmission';
import { useTaskForm } from '@/hooks/useTaskForm';

const Page = () => {
	const { form, handleChange, handleOptionClick, handleSubmit } = useTaskForm();

	return (
		<div className='max-w-3xl mx-auto mt-20 space-y-6'>
			<h1 className='text-4xl font-extrabold'>{form.title === '' ? 'Create new task' : 'Edit task'}</h1>
			<form onSubmit={handleSubmit} className='space-y-5' autoComplete="off">
				<FormInput
					label='Task title'
					name='title'
					value={form.title}
					onChange={handleChange}
					placeholder='eg. Optimize database queries (required)'
					required
				/>
				<FormTextArea
					value={form.description}
					onChange={handleChange}
					placeholder='eg. Improve performance by analyzing and optimizing slow or inefficient database queries. Apply best practices and indexing where needed. (optional)'
				/>
				<OptionGroup name='status' options={['Not started', 'In progress', 'In review', 'Completed']} form={form} handleOptionClick={handleOptionClick} />
				<OptionGroup name='priority' options={['Low', 'Medium', 'High']} form={form} handleOptionClick={handleOptionClick} />
				<OptionGroup name='effort' options={['Low', 'Medium', 'High']} form={form} handleOptionClick={handleOptionClick} />
				<FormInput
					label='Due date'
					name='dueDate'
					value={form.dueDate}
					onChange={handleChange}
					placeholder='YYYY-MM-DD (optional)'
				/>
				<FormInput
					label='Task type'
					name='taskType'
					value={form.taskType}
					onChange={handleChange}
					placeholder='eg. Design (optional)'
				/>
				<FormSubmission />
			</form>
		</div>
	);
};

export default Page;
