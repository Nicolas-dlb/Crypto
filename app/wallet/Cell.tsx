"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectMarket } from "../../redux/reducers/marketSlice";
import { Crypto } from "../../typing";
import {
	getNumberFixed,
	numberWithSpaces,
	stringUppercaseFirst,
} from "../../utils";

interface CellProps {
	name: string;
	amount: number;
}

function Cell({ name, amount }: CellProps) {
	const market = useSelector(selectMarket);
	const token = market?.find(
		(token: Crypto) => token.name.toLowerCase() === name
	);
	const value = token?.current_price * amount;

	return (
		<div className="text-slate-500 h-5 pl-3 pr-3 text-sm flex justify-around odd:bg-gray-100 ">
			<p className="w-24 flex flex-none overflow-visible justify-start">
				{stringUppercaseFirst(name)}
			</p>
			<p className="w-24 h-5 flex justify-center">
				{typeof amount == "number" ? amount.toFixed(5) : amount}
			</p>
			<p className="w-24 h-5 flex justify-end">
				{amount && numberWithSpaces(getNumberFixed(value || "", 2)) + " $"}
			</p>
		</div>
	);
}

export default Cell;
