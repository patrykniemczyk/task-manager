'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const FormSubmission: React.FC = () => {
	const router = useRouter();

	return (
		<div className='flex justify-end mt-4 gap-4'>
			<Button
				onClick={() => router.push('/tasks')}
				type='button'
				variant='outline'
			>
				Cancel
			</Button>
			<Button
				type='submit'
				variant='outline'
			>
				Confirm
			</Button>
		</div>
	);
};

export default FormSubmission;
