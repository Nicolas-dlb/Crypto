import React, { useState } from "react";
import Cell from "./Cell";

function Table() {
	const [wallet, setWallet] = useState({
		bitcoin: 1,
		etheurem: 2,
		ripple: 23,
		dogecoin: 1,
		tether: 2,
		solana: 7,
	});

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
						const name = token[0];
						const amount = token[1];
						return <Cell key={i} name={name} amount={amount} />;
					})}
			</div>
		</div>
	);
}

export default Table;
