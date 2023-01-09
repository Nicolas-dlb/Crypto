"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectMarket } from "../../../../redux/reducers/marketSlice";
import { Crypto } from "../../../../typing";
import {
	getNumberFixed,
	numberWithSpaces,
	stringUppercaseFirst,
} from "../../../../utils";

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
		<div className="text-slate-500 h-5 px-3 flex justify-around odd:bg-gray-100 xs:text-xs ">
			<p className="w-24 xs:w-20 flex  overflow-hidden text-ellipsis  justify-start">
				{stringUppercaseFirst(name)}
			</p>
			<p className="w-24 xs:w-20 h-5 flex xs:justify-end justify-center">
				{typeof amount == "number" ? amount.toFixed(5) : amount}
			</p>
			<p className="w-24 h-5 flex xs:hidden justify-end">
				{amount != null &&
					numberWithSpaces(getNumberFixed(value || "", 2)) + " $"}
			</p>
		</div>
	);
}

export default Cell;
