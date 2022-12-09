import React from "react";

interface TitleProps {
	value: string;
}

function Title({ value }: TitleProps) {
	return <h2 className="text-lg">{value}</h2>;
}

export default Title;
