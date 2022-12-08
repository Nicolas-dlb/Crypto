import { Crypto } from "./typing";

export const fetchCryptos = async () => {
	const request = await fetch(
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
	);
	const cryptos: Crypto[] = await request.json();
	return cryptos;
};
