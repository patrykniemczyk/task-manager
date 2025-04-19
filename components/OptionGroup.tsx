import React from 'react';
import clsx from 'clsx';

interface OptionGroupProps {
	name: string;
	options: string[];
	form: { [key: string]: string | number };
	handleOptionClick: (name: string, value: string) => void;
}

const OptionGroup: React.FC<OptionGroupProps> = ({ name, options, form, handleOptionClick }) => {
	const getColorClass = (value: string) => {
		switch (value) {
			case "High": return "text-red-400";
			case "Medium": return "text-yellow-300";
			case "Low": return "text-green-300";
			default: return "";
		}
	};

	return (
		<div className='flex items-center space-x-2'>
			<span className='w-24 capitalize'>{name}:</span>
			<div className='flex space-x-2'>
				{options.map(opt => (
					<button
						type='button'
						key={opt}
						onClick={() => handleOptionClick(name, opt)}
						className={clsx(
							'px-3 py-1 rounded-lg border',
							getColorClass(opt),
							form[name] === opt
								? 'bg-gray-800  border-gray-200'
								: 'border-gray-700 hover:text-gray-300 hover:bg-gray-800'
						)}
					>
						{opt}
					</button>
				))}
			</div>
		</div>
	);
};

export default OptionGroup;
