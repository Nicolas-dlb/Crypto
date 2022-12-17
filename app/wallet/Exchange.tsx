"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarket } from "../../redux/reducers/marketSlice";
import { selectWallet, swapToken } from "../../redux/reducers/walletSlice";
import { Crypto } from "../../typing";
import { fetchCryptos, isNumberKey } from "../../utils";
import Dropdown from "../settings/Dropdown";

function Exchange() {
	const [amountToSell, setAmountToSell] = useState<number | string>("");
	const dispatch = useDispatch();
	const [market, setMarket] = useState<Crypto[]>([]);
	const [tokenToSellName, setTokenToSellName] = useState("bitcoin");
	const [tokenToBuyName, setTokenToBuyName] = useState("ethereum");
	const wallet = useSelector(selectWallet);
	const inputRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetchCryptos().then((data) => {
			if (data !== market && data) {
				setMarket(data);
				dispatch(getMarket(data));
			}
		});
	}, []);

	const tokenToSell = market.find(
		(token) => token.name.toLowerCase() == tokenToSellName
	) as Crypto;
	const price = tokenToSell?.current_price * (amountToSell as number);
	const tokenToBuy = market.find(
		(token) => token.name.toLowerCase() == tokenToBuyName
	);
	let amountToBuy = price / (tokenToBuy?.current_price as number);

	const swapTokens = (e: MouseEvent) => {
		if (amountToSell) {
			if (amountToSell <= wallet[tokenToSellName]) {
				dispatch(
					swapToken({
						tokenToSell: tokenToSellName,
						amountToSell: amountToSell,
						tokenToBuy: tokenToBuyName,
						amountToBuy: amountToBuy,
					})
				);
				setAmountToSell("");
			} else {
				setError(true);
				setTimeout(() => {
					setError(false);
				}, 2000);
			}
		}
	};

	useEffect(() => {
		setAmountToSell(inputRef.current!.value);
	}, [inputRef.current?.value]);

	return (
		<div className="bg-slate-100 h-1/3 flex-col flex justify-between rounded-md p-4">
			<div className="text-start">
				<div className="flex w-[150px] justify-between">
					<h3 className="text-sm xs:text-xs mb-2 text-slate-600">Swap</h3>
					<p className="text-rose-700 text-[12.5px]">
						{error && "Insufisant wallet"}
					</p>
				</div>
				<div className="bg-white rounded-md h-8 flex justify-between w-full">
					<input
						onKeyPress={isNumberKey}
						onChange={(e) => setAmountToSell(e.target.value)}
						ref={inputRef}
						type="number"
						min="0"
						max={wallet[tokenToSellName]}
						step={
							wallet[tokenToSellName] < 0.001
								? "0.00001"
								: wallet[tokenToSellName] < 0.01
								? "0.0001"
								: wallet[tokenToSellName] < 3
								? "0.01"
								: "0.1"
						}
						value={amountToSell}
						placeholder="Enter an amount"
						className="bg-transparent w-full h-full  rounded-sm pl-2 outline-none"
					/>
					<Dropdown
						state={tokenToSellName}
						setState={setTokenToSellName}
						options={wallet}
						tokenToSellName={tokenToSellName}
					/>
				</div>
				<h3 className="text-sm my-1 xs:text-xs text-slate-600">For</h3>
				<div className="mt-2 pl-2 bg-slate-200 h-8 flex justify-between w-full rounded-md">
					<p className="w-full items-center flex text-slate-400">
						{amountToBuy > 0 && amountToBuy.toFixed(5)}
					</p>
					<Dropdown
						state={tokenToBuyName}
						setState={setTokenToBuyName}
						options={market}
						tokenToSellName={tokenToSellName}
					/>
				</div>
			</div>
			<button
				onClick={swapTokens}
				className="bg-slate-300 text-white rounded-md w-full h-8 mt-4"
			>
				Exchange
			</button>
		</div>
	);
}

export default Exchange;
