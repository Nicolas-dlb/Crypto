import React from "react";

interface TitleProps {
	value: string;
}

function Title({ value }: TitleProps) {
	return (
		<h2 className="text-base text-gray-600 font-semibold my-2">{value}</h2>
	);
}

export default Title;
