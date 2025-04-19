'use client'
import React, { useRef, useEffect } from 'react';

interface FormTextAreaProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ value, onChange, placeholder }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [value]);

	return (
		<div>
			<label className='block mb-4'>Description:</label>
			<textarea
				ref={textareaRef}
				name='description'
				value={value}
				onChange={onChange}
				spellCheck='false'
				rows={2}
				className='w-full p-4 border rounded resize-none overflow-hidden'
				placeholder={placeholder}
			/>
		</div>
	);
};

export default FormTextArea;
