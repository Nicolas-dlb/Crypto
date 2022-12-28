import React from "react";

interface LabelProps {
	className?: string;
	children: string;
}

function Label({ className, children }: LabelProps): JSX.Element {
	return (
		<p className={`text-sm text-slate-600 font-medium ${className}`}>
			{children}
		</p>
	);
}

export default Label;
