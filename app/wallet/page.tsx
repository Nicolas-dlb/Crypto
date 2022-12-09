"use client";
import React from "react";
import Exchange from "./Exchange";
import Table from "./Table";

function Wallet() {
	return (
		<div className="m-2">
			<h2 className="text-xl">Exchange</h2>
			<Exchange />
			<h2 className="text-xl">Wallet</h2>
			<Table />
		</div>
	);
}

export default Wallet;
