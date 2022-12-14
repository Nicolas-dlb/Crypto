import { KeyboardEvent } from "react";
import { Crypto } from "./typing";

export const fetchCryptos = async () => {
	try {
		const request = await fetch(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
		);
		const cryptos: Crypto[] = await request.json();
		return cryptos;
	} catch (error) {
		throw new Error("Market not fetched");
	}
};

export const getNumberFixed = (v: any, d: number): number => {
	return Number((Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d));
};

export const stringUppercaseFirst = (a: any) =>
	`${a}`.charAt(0).toUpperCase() + a.substr(1);

export const isNumberKey = (evt: KeyboardEvent<HTMLInputElement>) => {
	const BIRTHNUMBER_ALLOWED_CHARS_REGEXP = /[0-9\/]+/;
	if (evt.key !== ",") {
		if (!BIRTHNUMBER_ALLOWED_CHARS_REGEXP.test(evt.key)) {
			evt.preventDefault();
		}
	}
};

export const numberWithSpaces = (x: any) => {
	const parts = x?.toString().split(".");
	if (parts) {
		parts![0] = parts![0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}
	return parts?.join(".");
};
