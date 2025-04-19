'use client'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

const useNavigateWithData = () => {
	const router = useRouter()

	const navigateWithData = useCallback((overrides = {}) => {
		const defaultValues = {
			id: null,
			title: '',
			description: '',
			status: 'Not started',
			priority: 'Medium',
			effort: 'Medium',
			duedate: '',
			tasktype: '',
			...overrides
		}

		sessionStorage.setItem('taskDefaults', JSON.stringify(defaultValues))
		router.push('/create-and-edit')
	}, [router])

	return navigateWithData
}

export default useNavigateWithData
