'use client'
import { useState, useEffect } from 'react';

export const useTaskForm = () => {
	const [form, setForm] = useState({
		title: '',
		description: '',
		status: 'Not started',
		priority: 'Medium',
		effort: 'Medium',
		dueDate: '',
		taskType: ''
	});
	const [taskId, setTaskId] = useState<number | null>(null);

	useEffect(() => {
		const data = sessionStorage.getItem('taskDefaults');
		if (data) {
			const parsed = JSON.parse(data);
			setForm(parsed);
			setTaskId(parsed.id || null);
		}
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	}

	const handleOptionClick = (name: string, value: string) => {
		setForm(prev => ({ ...prev, [name]: value }));
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('New Task:', form, 'taskId:', taskId);
	}

	return {
		form,
		setForm,
		taskId,
		handleChange,
		handleOptionClick,
		handleSubmit,
	};
};
