'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import TaskTable from '@/components/TaskTable'
import useNavigateWithData from '@/hooks/useNavigateWithData'

const Page = () => {
	const navigateWithData = useNavigateWithData();

	return (
		<>
			<div className='flex mt-20'>
				<div>
					<h1 className='text-4xl font-semibold mb-2'>Hi, Patryk.</h1>
					<p className='mb-10'>Stay organized with your tasks.</p>
				</div>
				<div className='ml-auto m-6'>
					<Button variant='outline' onClick={() => navigateWithData()}>New task</Button>
				</div>
				<div className='m-6 ml-0'>
					<Button variant='outline'>Sign out</Button>
				</ div>
			</ div>
			<TaskTable />
		</>
	)
}

export default Page