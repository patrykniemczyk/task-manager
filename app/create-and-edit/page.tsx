'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useTaskForm } from '@/hooks/useTaskForm';
import FormSkeleton from '@/components/FormSkeleton';
import TaskForm from '@/components/TaskForm';

const Page = () => {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
	}, [status, router]);

	const taskForm = useTaskForm();

	if (status === 'loading') {
		return <FormSkeleton />;
	}

	return <TaskForm taskForm={taskForm} />;
};

export default Page;
