"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "../../redux/reducers/walletSlice";
import Cell from "./Cell";

function Table() {
	const wallet = useSelector(selectWallet);

	return (
		<div className="bg-slate-100 rounded-md flex-col flex h-80">
			<div className="flex justify-around w-full h-fit border-b border-slate-300">
				<p className="w-20 h-fit flex  justify-start">Token</p>
				<p className="w-20 h-fit flex  justify-center">amount</p>
				<p className="w-20 h-fit flex  justify-end">value</p>
			</div>
			<div className="flex-col overflow-scroll rounded-md flex items-between justify-start h-full bg-white ">
				{Object.entries(wallet)
					.concat(Array.from(Array(20).fill(["", ""])))
					.map((token: any, i: number) => {
						return <Cell key={i} name={token[0]} amount={token[1]} />;
					})}
			</div>
		</div>
	);
}

export default Table;
