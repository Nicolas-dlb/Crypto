import React from "react";
import { Crypto } from "../../typing";
import { fetchCryptos } from "../../utils";
import Card from "./components/Card";

async function Market() {
	const cryptos: Crypto[] = await fetchCryptos();

	return (
		<div className="overflow-scroll md:w-full flex-col justify-start pt-1 md:pt-0 h-[95.5vh] md:h-full">
			{cryptos?.map((crypto: Crypto) => (
				<Card key={crypto.id} {...crypto} />
			))}
		</div>
	);
}

export default Market;
