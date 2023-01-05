"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMarket } from "../../redux/reducers/marketSlice";
import { selectMoney, selectWallet } from "../../redux/reducers/walletSlice";
import { Crypto } from "../../typing";
import { isNumberKey, updateWallet } from "../../utils";
import { container, input, inputContainer } from "../styles/exchange";
import Dropdown from "./Dropdown";

function Market() {
	const [insufficientMoney, setInsufficientMoney] = useState(false);
	const [amount, setAmount] = useState<number | string>("");
	const market = useSelector(selectMarket);
	const wallet = useSelector(selectWallet);
	const usd = useSelector(selectMoney);

	const [selectedToken, setSelectedToken] = useState<Crypto>();

	const manageToken = async (transactionType: string) => {
		const token = market.find(
			(crypto: Crypto) => crypto.name === selectedToken!.name
		);
		let amountOfToken = (amount as number) / token.current_price;
		const tokenName = selectedToken!.name.toLowerCase();

		if (
			amount &&
			((transactionType === "buy" && amount <= usd) ||
				(transactionType === "sell" && amountOfToken <= wallet[tokenName]))
		) {
			if (transactionType === "sell") {
				amountOfToken = -amountOfToken;
			}
			const value = (transactionType === "buy" ? -amount : amount) as number;
			updateWallet(tokenName, amountOfToken, value);
			setAmount("");
			setInsufficientMoney(false);
		} else {
			setInsufficientMoney(true);
		}
	};

	useEffect(() => {
		market && !selectedToken && setSelectedToken(market[0]);
	}, [market]);

	return (
		<div className={container + " mt-2"}>
			<div className={inputContainer + `${insufficientMoney && "bg-rose-200"}`}>
				<input
					onKeyPress={(e) => isNumberKey(e)}
					onChange={(e) => setAmount(e.target.value)}
					type="number"
					min="0"
					value={amount}
					placeholder="Enter an amount"
					className={input}
				/>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="15px"
					height="15px"
					fill="#94a3b8"
					className="flex-none mr-2"
				>
					<path d="M15.999 8.5h2c0-2.837-2.755-4.131-5-4.429V2h-2v2.071c-2.245.298-5 1.592-5 4.429 0 2.706 2.666 4.113 5 4.43v4.97c-1.448-.251-3-1.024-3-2.4h-2c0 2.589 2.425 4.119 5 4.436V22h2v-2.07c2.245-.298 5-1.593 5-4.43s-2.755-4.131-5-4.429V6.1c1.33.239 3 .941 3 2.4zm-8 0c0-1.459 1.67-2.161 3-2.4v4.799c-1.371-.253-3-1.002-3-2.399zm8 7c0 1.459-1.67 2.161-3 2.4v-4.8c1.33.239 3 .941 3 2.4z"></path>
				</svg>
				<div className="flex flex-col items-center justify-center h-full">
					<button
						className="shadow bg-gray-50 hover:bg-gray-100 px-2 w-5 flex items-center justify-center h-2/4 rounded-t rounded-tr-none "
						onClick={() =>
							setAmount((prev) =>
								!prev ? 10 : parseFloat(prev as string) + 10
							)
						}
					>
						+
					</button>
					<button
						className="shadow bg-gray-50 hover:bg-gray-100 px-2 w-5 flex items-center justify-center h-2/4 rounded-b rounded-br-none"
						onClick={() =>
							setAmount((prev) =>
								prev && parseFloat(prev as string) - 10 > 0
									? parseFloat(prev as string) - 10
									: 0
							)
						}
					>
						-
					</button>
				</div>
				<Dropdown
					selectedToken={selectedToken}
					setSelectedToken={setSelectedToken}
					options={market}
				/>
			</div>
			<div className="flex justify-evenly w-full mt-2">
				<button
					onClick={() => manageToken("buy")}
					className="bg-slate-200 hover:bg-slate-300 rounded-md text-slate-500 shadow font-medium text-xs p-2 flex-none flex items-center justify-center w-3/6 mr-2"
				>
					Buy
				</button>
				<button
					onClick={() => manageToken("sell")}
					className={
						"bg-slate-200 hover:bg-slate-300 rounded-md text-slate-500 shadow font-medium text-xs p-2 flex-none flex items-center justify-center w-3/6"
					}
				>
					Sell
				</button>
			</div>
		</div>
	);
}

export default Market;
