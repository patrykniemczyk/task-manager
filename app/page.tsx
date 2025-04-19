import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const page = () => {
	return (
		<>
			<h1 className='text-6xl font-extrabold text-center mb-4 mt-60'>Get Things Done, Effortlessly.</h1>
			<h2 className='text-2xl font-light text-center'>Your smarter, simpler task manager for everyday productivity.</h2>
			<div className="flex justify-center mt-16">
				<Button className='p-5'>
					<Image src='/google.png' width={16} height={16} alt="Google" className="mr-2"></Image>
					Sign in with Google and stay organized</Button>
			</div>
		</>
	)
}

export default page