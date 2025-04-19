import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SignIn from '@/components/SignIn'

const page = async () => {
	const session = await auth()

	if (session) {
		redirect('/tasks')
	}

	return (
		<>
			<h1 className='text-6xl font-extrabold text-center mb-4 mt-60'>Get Things Done, Effortlessly.</h1>
			<h2 className='text-2xl font-light text-center'>Your smarter, simpler task manager for everyday productivity.</h2>
			<div className="flex justify-center mt-16">
				<SignIn />
			</div>
		</>
	)
}

export default page