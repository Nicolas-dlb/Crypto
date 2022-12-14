"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarket } from "../../redux/reducers/marketSlice";
import { selectWallet, swapToken } from "../../redux/reducers/walletSlice";
import { Crypto } from "../../typing";
import { fetchCryptos, isNumberKey } from "../../utils";

function Exchange() {
	const [amountToSell, setAmountToSell] = useState<number | string>("");
	const dispatch = useDispatch();
	const [market, setMarket] = useState<Crypto[]>([]);
	const [tokenToSellName, setTokenToSellName] = useState("bitcoin");
	const [tokenToBuyName, setTokenToBuyName] = useState("ethereum");
	const wallet = useSelector(selectWallet);
	const selectRef = useRef<HTMLSelectElement>(null);
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
		setAmountToSell(parseFloat(inputRef.current!.value));
	}, [inputRef.current?.value]);

	useEffect(() => {
		setTokenToBuyName(selectRef.current!.value);
	}, [selectRef.current?.value]);

	return (
		<div className="bg-slate-100 h-1/3 flex-col flex justify-between rounded-md p-4">
			<div className="text-start">
				<div className="flex w-[150px] justify-between">
					<h3 className="text-sm mb-2 text-slate-600">Swap</h3>
					<p className="text-rose-700 text-[12.5px]">
						{error && "Insufisant wallet"}
					</p>
				</div>
				<div className="bg-white rounded-md h-8 flex justify-between w-full">
					<input
						onKeyPress={isNumberKey}
						onChange={(e) => setAmountToSell(parseFloat(e.target.value))}
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
					<select
						onChange={(e) => {
							setAmountToSell(0);
							setTokenToSellName(e.target.value);
						}}
						placeholder="BTC"
						className="outline-none rounded-md w-[120px]"
					>
						{market.length > 0 ? (
							Object.entries(wallet).map((token: any) => (
								<option key={token[0]} value={token[0].toLowerCase()}>
									{market
										.find((crypto) => crypto.name.toLowerCase() === token[0])
										?.symbol.toUpperCase()}
								</option>
							))
						) : (
							<option value="bitcoin">BTC</option>
						)}
					</select>
				</div>
				<h3 className="text-sm my-1 text-slate-600">For</h3>
				<div className="mt-2 md:mt-0 pl-2 bg-slate-200 py-2 h-8 flex justify-between w-full rounded-md">
					<p className="w-full text-slate-400">
						{amountToBuy > 0 && amountToBuy.toFixed(5)}
					</p>
					<select
						ref={selectRef}
						value={tokenToBuyName}
						onChange={(e) => setTokenToBuyName(e.target.value)}
						className="rounded-md bg-slate-200 w-[120px] outline-none text-slate-400"
					>
						{market.length > 0 ? (
							market
								.filter(
									(crypto) => crypto.name.toLowerCase() !== tokenToSellName
								)
								.map((token: any) => (
									<option key={token.name} value={token.name.toLowerCase()}>
										{token.symbol.toUpperCase()}
									</option>
								))
						) : (
							<option value="ethereum">ETH</option>
						)}
					</select>
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
