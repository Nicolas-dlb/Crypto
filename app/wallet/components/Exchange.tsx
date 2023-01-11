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
import { fetchCryptos, isNumberKey } from "../../../utils";
import Label from "../../components/Label";
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

	useEffect(() => {
		fetchCryptos().then((data) => {
			if (data !== market && data) {
				setMarket(data);
				dispatch(getMarket(data));
			}
		});
	}, []);

	return (
		<div className="bg-slate-100 shadow flex-col flex justify-between rounded-md p-4 lg:w-11/12">
			<div className="flex w-[160px] justify-between">
				<Label className="mb-2">Swap</Label>
				<Error>{insufficientTokens && "Insufficient tokens"}</Error>
			</div>
			<div
				className={`h-8 flex justify-between w-full rounded-md items-center ${
					insufficientTokens ? "bg-rose-200" : "bg-white"
				}`}
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
					className={`bg-transparent w-full h-full rounded-md outline-none pl-2 ${
						insufficientTokens
							? "placeholder:text-[#e07382]"
							: "placeholder:text-slate-400"
					}`}
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

			<button
				onClick={swapTokens}
				className="bg-slate-200 mt-4 hover:bg-slate-300 rounded-md text-slate-500 shadow font-medium text-xs p-2 flex-none flex items-center justify-center w-full"
			>
				Exchange
			</button>
		</div>
	);
}

export default Exchange;
