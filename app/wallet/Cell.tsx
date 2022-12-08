import React from "react";

interface CellProps {
	name: string;
	amount: number;
}

function Cell({ name, amount }: CellProps) {
	const strUcFirst = (a: any) => `${a}`.charAt(0).toUpperCase() + a.substr(1);

	return (
		<div className="text-slate-500 h-5 w-full text-sm flex justify-around odd:bg-gray-100 ">
			<p className="w-20 h-fit flex justify-start">
				{name && strUcFirst(name)}
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
