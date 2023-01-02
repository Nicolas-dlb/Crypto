"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "../../redux/reducers/walletSlice";
import Cell from "./Cell";

function Table() {
	const wallet = useSelector(selectWallet);

	return (
		<div className="bg-slate-100 shadow rounded-md flex-col min-w-[140px] lg:w-full flex h-80 lg:h-[90vh]">
			<div className="flex justify-around w-full h-fit border-b px-3 border-slate-300">
				<p className="w-24 xs:w-20 flex-none h-fit flex justify-start font-medium text-slate-700">
					Token
				</p>
				<p className="w-24 xs:w-20 h-fit flex xs:justify-end justify-center font-medium text-slate-700">
					amount
				</p>
				<p className="w-24 h-fit xs:hidden flex justify-end font-medium text-slate-700">
					value
				</p>
			</div>
			<div className="flex-col overflow-scroll rounded-md flex items-between justify-start h-full bg-white ">
				{Object.entries(wallet)
					.concat(Array.from(Array(40).fill(["", null])))
					.map((token: any, i: number) => {
						return <Cell key={i} name={token[0]} amount={token[1]} />;
					})}
			</div>
		</div>
	);
}

export default Table;
