import React from 'react';

interface FormInputProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange, placeholder, required }) => {
	return (
		<div className='flex items-center'>
			<label className='w-24'>{label}:</label>
			<input
				type='text'
				name={name}
				value={value}
				onChange={onChange}
				className='flex-1 p-3 border rounded'
				placeholder={placeholder}
				required={required}
			/>
		</div>
	);
};

export default FormInput;
