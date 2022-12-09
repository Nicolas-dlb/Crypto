import React from "react";
import { stringUppercaseFirst } from "../../utils";

interface CellProps {
	name: string;
	amount: number;
	index: number;
}

function Cell({ name, amount, index }: CellProps) {
	return (
		<div
			key={index}
			className="text-slate-500 h-5 w-full text-sm flex justify-around odd:bg-gray-100 "
		>
			<p className="w-20 h-fit flex justify-start">
				{name && stringUppercaseFirst(name)}
			</p>
			<p className="w-20 h-fit flex  justify-center">
				{amount > 0 ? amount : <>&nbsp;</>}
			</p>
			<p className="w-20 h-fit flex justify-end">
				{amount > 0 ? amount : <>&nbsp;</>}
			</p>
		</div>
	);
}

export default Cell;
