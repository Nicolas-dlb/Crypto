import React from "react";
import { stringUppercaseFirst } from "../../utils";

interface CellProps {
	name: string;
	amount: number;
}

function Cell({ name, amount }: CellProps) {
	return (
		<div className="text-slate-500 h-5 w-full text-sm flex justify-around odd:bg-gray-100 ">
			<p className="w-20 h-5 flex justify-start">
				{stringUppercaseFirst(name)}
			</p>
			<p className="w-20 h-5 flex  justify-center">{amount}</p>
			<p className="w-20 h-5 flex justify-end">{amount}</p>
		</div>
	);
}

export default Cell;
