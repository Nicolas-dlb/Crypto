"use client";
import React, {
	KeyboardEvent,
	MouseEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarket } from "../../../redux/reducers/marketSlice";
import { selectWallet } from "../../../redux/reducers/walletSlice";
import { Crypto } from "../../../typing";
import { classNames, fetchCryptos, isNumberKey } from "../../../utils";
import Label from "../../components/Label";
import { button } from "../../styles/globals";
import {
	container,
	input,
	inputContainer,
	labelWithErrorContainer,
} from "../../styles/exchange";
import Error from "../../components/Error";
import { auth, db } from "../../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Dropdown from "../../components/Dropdown";
import CustomNumberInputButtons from "../../components/CustomNumberInputButtons";

function Exchange() {
	const [amountToSell, setAmountToSell] = useState<string | number>("");
	const dispatch = useDispatch();
	const [market, setMarket] = useState<Crypto[]>([]);
	const [tokenToSell, setTokenToSell] = useState<Crypto>();
	const [tokenToBuy, setTokenToBuy] = useState<Crypto>();
	const wallet = useSelector(selectWallet);
	const inputRef = useRef<HTMLInputElement>(null);
	const [insufficientTokens, setInsufficientTokens] = useState(false);
	const [price, setPrice] = useState(0);
	const [step, setStep] = useState(0.1);
	const [amountToBuy, setAmountToBuy] = useState<number | null>(null);
	const [buyOptions, setBuyOptions] = useState<Crypto[]>();

	useEffect(() => {
		setBuyOptions(market.filter((token) => token.name !== tokenToSell?.name));
	}, [tokenToSell]);

	useEffect(() => {
		buyOptions && setTokenToBuy(buyOptions[0]);
	}, [buyOptions]);

	useEffect(() => {
		if (tokenToSell) {
			setPrice(tokenToSell!.current_price * (amountToSell as number));
			setStep(
				wallet[tokenToSell!.name.toLowerCase()] < 0.001
					? 0.00001
					: wallet[tokenToSell!.name.toLowerCase()] < 0.01
					? 0.0001
					: wallet[tokenToSell!.name.toLowerCase()] < 3
					? 0.01
					: 0.1
			);
		}
	}, [tokenToSell, wallet, amountToSell, market]);

	useEffect(() => {
		if (amountToSell) {
			setAmountToBuy(price / (tokenToBuy?.current_price as number));
		}
	}, [tokenToSell, tokenToBuy, price]);

	useEffect(() => {
		if (tokenToBuy && amountToSell) {
			setPrice(tokenToSell!.current_price * (amountToSell as number));
			setAmountToBuy(price / (tokenToBuy?.current_price as number));
		} else if (tokenToBuy && !amountToSell) {
			setAmountToBuy(null);
		}
	}, [amountToSell, tokenToBuy, tokenToSell, market]);

	const swapTokens = (
		e: MouseEvent | KeyboardEvent<HTMLInputElement>
	): void => {
		if (amountToSell) {
			if (amountToSell <= wallet[tokenToSell!.name.toLowerCase()]) {
				const userRef = doc(db, "users", auth.currentUser!.uid);
				updateDoc(userRef, {
					wallet: {
						...wallet,
						[tokenToSell!.name.toLowerCase()]:
							wallet[tokenToSell!.name.toLowerCase()] -
							(amountToSell as number),
						[tokenToBuy!.name.toLowerCase()]:
							wallet[tokenToBuy!.name.toLowerCase()] + amountToBuy ||
							amountToBuy,
					},
				});
				setAmountToSell(0);
				setInsufficientTokens(false);
			} else {
				setInsufficientTokens(true);
			}
		}
	};

	// useEffect(() => {
	// 	console.log(inputRef);
	// 	setAmountToSell(inputRef.current!.value);
	// }, [inputRef.current?.value]);

	useEffect(() => {
		fetchCryptos().then((data) => {
			if (data !== market && data) {
				setMarket(data);
				dispatch(getMarket(data));
			}
		});
	}, []);

	return (
		<div className={container}>
			<div className={labelWithErrorContainer}>
				<Label className="mb-2">Swap</Label>
				<Error>{insufficientTokens && "Insufficient tokens"}</Error>
			</div>
			<div
				className={inputContainer + `${insufficientTokens && "bg-rose-200"}`}
			>
				<input
					onKeyPress={(e) => {
						isNumberKey(e);
						e.key === "Enter" && swapTokens(e);
					}}
					onChange={(e) => setAmountToSell(e.target.value)}
					ref={inputRef}
					type="number"
					min="0"
					max={tokenToSell && wallet[tokenToSell!.name.toLowerCase()]}
					step={step}
					value={amountToSell}
					placeholder="Enter an amount"
					className={input}
				/>
				<CustomNumberInputButtons
					inputRef={inputRef}
					setValue={setAmountToSell}
				/>
				<Dropdown
					selectedToken={tokenToSell}
					setSelectedToken={setTokenToSell}
					options={market.filter((token) =>
						Object.keys(wallet).includes(token.name.toLowerCase())
					)}
				/>
			</div>
			<Label className="my-2">For</Label>
			<div className="pl-2 h-8 flex justify-between w-full rounded-md bg-slate-200">
				<p className="items-center flex text-slate-400">
					{amountToBuy?.toFixed(5)}
				</p>
				<Dropdown
					selectedToken={tokenToBuy}
					setSelectedToken={setTokenToBuy}
					options={buyOptions}
				/>
			</div>

			<button onClick={swapTokens} className={classNames(button, "mt-4")}>
				Exchange
			</button>
		</div>
	);
}

export default Exchange;
