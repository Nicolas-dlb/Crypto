import React from "react";
import { Crypto } from "../../typing";
import { fetchCryptos } from "../../utils";
import Card from "./Card";

async function Dashboard() {
	const cryptos: Crypto[] = await fetchCryptos();

	return (
		<div className=" overflow-scroll md:w-full flex-col justify-start custom-height-dashboard md:h-full  md:top-0">
			{cryptos?.map((crypto: Crypto, index) => (
				<Card key={index} {...crypto} />
			))}
		</div>
	);
}

export default Dashboard;
