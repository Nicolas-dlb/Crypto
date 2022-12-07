"use client";

import React, { useEffect, useState } from "react";
import { Crypto } from "../../typing";
import Card from "./Card";
const fetchCryptos = async () => {
	const request = await fetch(
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
	);
	const cryptos: Crypto[] = await request.json();
	return cryptos;
};

function Dashboard() {
	const [cryptos, setCryptos] = useState<Crypto[]>();
	useEffect(() => {
		fetchCryptos().then((data) => setCryptos(data));
	}, []);
	return (
		<div className=" overflow-scroll md:w-full flex-col justify-start custom-height-dashboard md:h-full  md:top-0">
			{cryptos?.map((crypto: Crypto) => (
				<Card {...crypto} />
			))}
		</div>
	);
}

export default Dashboard;
