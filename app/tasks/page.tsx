'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import DashboardHeader from '@/components/DashboardHeader';
import TaskTable from '@/components/TaskTable';

const Page = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
	}, [status, router]);

	if (status === 'loading') {
		return null;
	}

	return (
		<>
			<DashboardHeader username={session?.user?.name} />
			<TaskTable />
		</>
	);
};

export default Page;
