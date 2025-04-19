'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import SignOut from '@/components/SignOut';
import useNavigateWithData from '@/hooks/useNavigateWithData';

interface DashboardHeaderProps {
	username?: string | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => {
	const navigateWithData = useNavigateWithData();

	const firstName = username?.split(' ')[0] || 'User';

	return (
		<div className="flex mt-20 items-start">
			<div>
				<h1 className="text-4xl font-semibold mb-2">Hi, {firstName}.</h1>
				<p className="mb-10">Stay organized with your tasks.</p>
			</div>
			<div className="ml-auto flex gap-4 m-6">
				<Button variant="outline" onClick={() => navigateWithData()}>
					New task
				</Button>
				<SignOut />
			</div>
		</div>
	);
};

export default DashboardHeader;
