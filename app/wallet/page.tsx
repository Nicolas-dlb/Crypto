"use client";
import React from "react";
import Exchange from "./Exchange";
import WalletTable from "./WalletTable";

function Wallet() {
	return (
		<div className="m-2">
			<h2 className="text-xl">Exchange</h2>
			<Exchange />
			<h2 className="text-xl">Wallet</h2>
			<WalletTable />
		</div>
	);
}

export default Wallet;
