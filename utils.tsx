import { Crypto } from "./typing";

export const fetchCryptos = async () => {
	const request = await fetch(
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
	);
	const cryptos: Crypto[] = await request.json();
	return cryptos;
};

export const getNumberFixed = (v: any, d: number): number => {
	return Number((Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d));
};

export const stringUppercaseFirst = (a: any) =>
	`${a}`.charAt(0).toUpperCase() + a.substr(1);
