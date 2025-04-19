'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { createTask, updateTask } from '@/actions';
import { useRouter } from 'next/navigation'
import { Task } from '@/types/Task';

export const useTaskForm = () => {

	const { data: session } = useSession();
	const router = useRouter()

	const [form, setForm] = useState<Task>({
		id: 0,
		title: '',
		description: '',
		status: 'Not started',
		priority: 'Medium',
		effort: 'Medium',
		duedate: '',
		tasktype: ''
	});
	const [taskId, setTaskId] = useState<number | null>(null);

	useEffect(() => {
		const data = sessionStorage.getItem('taskDefaults');
		if (data) {
			const parsed = JSON.parse(data);
			setForm(prev => ({
				...prev,
				...parsed,
			}));
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
		if (taskId) {
			if (session?.user?.email) {
				updateTask(session.user.email, { ...form, id: taskId });
			} else {
				console.error('User email is not available.');
			}
		} else {
			if (session?.user?.email) {
				createTask(session.user.email, { ...form, id: taskId ?? 0 });
			} else {
				console.error('User email is not available.');
			}
		}
		router.push('/tasks');
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
