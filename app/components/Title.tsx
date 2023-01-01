import React from "react";

interface TitleProps {
	value: string;
	className?: string;
}

function Title({ value, className }: TitleProps) {
	return (
		<h2
			className={`text-base text-gray-600 font-semibold my-2 w-full ${className}`}
		>
			{value}
		</h2>
	);
}

export default Title;
