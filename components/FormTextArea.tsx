'use client'
import React, { useEffect } from 'react';

interface FormTextAreaProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ value, onChange, placeholder }) => {

	useEffect(() => {
		document.querySelectorAll("textarea").forEach(function (textarea) {
			textarea.style.height = textarea.scrollHeight + "px";
			textarea.style.overflowY = "hidden";

			textarea.addEventListener("input", function () {
				this.style.height = "auto";
				this.style.height = this.scrollHeight + "px";
			});
		});
	});

	return (
		<div>
			<label className='block mb-4'>Description:</label>
			<textarea
				name='description'
				value={value}
				onChange={onChange}
				spellCheck='false'
				className='w-full p-4 border rounded resize-none overflow-hidden'
				placeholder={placeholder}
			/>
		</div>
	);
};

export default FormTextArea;
