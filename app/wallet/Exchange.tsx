"use client";
import React, {
	KeyboardEvent,
	MouseEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarket } from "../../redux/reducers/marketSlice";
import { selectWallet, swapToken } from "../../redux/reducers/walletSlice";
import { Crypto } from "../../typing";
import { classNames, fetchCryptos, isNumberKey } from "../../utils";
import Label from "../components/Label";
import { button } from "../styles/globals";
import { input } from "../styles/exchange";
import Dropdown from "./Dropdown";
import Error from "../components/Error";
import { auth, db } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

function Exchange() {
	const [amountToSell, setAmountToSell] = useState<number | string>("");
	const dispatch = useDispatch();
	const [market, setMarket] = useState<Crypto[]>([]);
	const [tokenToSellName, setTokenToSellName] = useState("bitcoin");
	const [tokenToBuyName, setTokenToBuyName] = useState("ethereum");
	const wallet = useSelector(selectWallet);
	const inputRef = useRef<HTMLInputElement>(null);
	const [insufficientTokens, setInsufficientTokens] = useState(false);

	const tokenToSell = market.find(
		(token) => token.name.toLowerCase() == tokenToSellName
	) as Crypto;
	const price = tokenToSell?.current_price * (amountToSell as number);
	const tokenToBuy = market.find(
		(token) => token.name.toLowerCase() == tokenToBuyName
	);
	let amountToBuy = price / (tokenToBuy?.current_price as number);

	const step =
		wallet[tokenToSellName] < 0.001
			? "0.00001"
			: wallet[tokenToSellName] < 0.01
			? "0.0001"
			: wallet[tokenToSellName] < 3
			? "0.01"
			: "0.1";

	const swapTokens = (
		e: MouseEvent | KeyboardEvent<HTMLInputElement>
	): void => {
		if (amountToSell) {
			if (amountToSell <= wallet[tokenToSellName]) {
				const userRef = doc(db, "users", auth.currentUser!.uid);
				updateDoc(userRef, {
					wallet: {
						...wallet,
						[tokenToSellName]:
							wallet[tokenToSellName] - parseFloat(amountToSell as string),
						[tokenToBuyName]:
							wallet[tokenToBuyName] + amountToBuy || amountToBuy,
					},
				});
				setAmountToSell("");
			} else {
				setInsufficientTokens(true);
				setTimeout(() => {
					setInsufficientTokens(false);
				}, 2000);
			}
		}
	};

	useEffect(() => {
		fetchCryptos().then((data) => {
			if (data !== market && data) {
				setMarket(data);
				dispatch(getMarket(data));
			}
		});
	}, []);

	useEffect(() => {
		setAmountToSell(inputRef.current!.value);
	}, [inputRef.current?.value]);

	return (
		<div className="bg-slate-100 shadow flex-col flex justify-between rounded-md p-4 lg:w-11/12">
			<div className="flex w-[160px] justify-between">
				<Label className="mb-2">Swap</Label>
				<Error>{insufficientTokens && "Insufficient tokens"}</Error>
			</div>
			<div className="pl-2 h-8 flex justify-between w-full rounded-md bg-white">
				<input
					onKeyPress={(e) => {
						isNumberKey(e);
						e.key === "Enter" && swapTokens(e);
					}}
					onChange={(e) => setAmountToSell(e.target.value)}
					ref={inputRef}
					type="number"
					min="0"
					max={wallet[tokenToSellName]}
					step={step}
					value={amountToSell}
					placeholder="Enter an amount"
					className={input}
				/>
				<Dropdown
					state={tokenToSellName}
					setState={setTokenToSellName}
					options={wallet}
					tokenToSellName={tokenToSellName}
					type="Sell"
				/>
			</div>
			<Label className="my-2">For</Label>
			<div className="pl-2 h-8 flex justify-between w-full rounded-md bg-slate-200">
				<p className="items-center flex text-slate-400">
					{amountToBuy > 0 && amountToBuy.toFixed(5)}
				</p>
				<Dropdown
					state={tokenToBuyName}
					setState={setTokenToBuyName}
					options={market}
					tokenToSellName={tokenToSellName}
					type="Buy"
				/>
			</div>

			<button onClick={swapTokens} className={classNames(button, "mt-4")}>
				Exchange
			</button>
		</div>
	);
}

export default Exchange;
