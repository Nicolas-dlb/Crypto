import React from "react";
import Title from "../components/Title";
import Exchange from "./Exchange";
import Table from "./Table";

function Wallet() {
	return (
		<div className="m-2">
			<Title value="Exchange" />
			<Exchange />
			<Title value="Wallet" />
			<Table />
		</div>
	);
}

export default Wallet;
