"use client";
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { selectMarket } from "../../redux/reducers/marketSlice";
import { useSelector } from "react-redux";
import { Crypto } from "../../typing";
import {
	button,
	chevronDownIcon,
	container,
	item,
	menu,
} from "../styles/dropdown";

export default function Dropdown({
	state,
	setState,
	options,
	tokenToSellName,
}: any) {
	const market = useSelector(selectMarket);
	const crypto = market.find(
		(crypto: Crypto) => crypto.name.toLowerCase() === state
	);

	const isMarketDropdown = options[0]?.name !== undefined;

	useEffect(() => {
		isMarketDropdown &&
			setState(
				state.toLowerCase() === tokenToSellName.toLowerCase()
					? options
							.filter(
								(crypto: Crypto) =>
									crypto?.name.toLowerCase() != state.toLowerCase()
							)[0]
							.name.toLowerCase()
					: crypto?.name.toLowerCase()
			);
	}, [tokenToSellName]);

	const getSymbol = (token: any): string => {
		return market
			.find((crypto: Crypto) => crypto?.name.toLowerCase() === token)
			.symbol.toUpperCase();
	};

	return (
		<Menu as="div" className={container}>
			<Menu.Button className={button}>
				{isMarketDropdown && state === tokenToSellName
					? options
							.filter((crypto: Crypto) => crypto.name.toLowerCase() != state)[0]
							.symbol.toUpperCase()
					: crypto?.symbol.toUpperCase()}
				<ChevronDownIcon className={chevronDownIcon} aria-hidden="true" />
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className={menu}>
					{isMarketDropdown
						? options
								.filter(
									(crypto: Crypto) =>
										crypto.name.toLowerCase() != tokenToSellName.toLowerCase()
								)
								.map((option: Crypto) => (
									<Menu.Item key={option.name}>
										{() => (
											<button
												onClick={(e: any) =>
													setState(option.name.toLowerCase())
												}
												className={item}
											>
												{option.symbol.toUpperCase()}
											</button>
										)}
									</Menu.Item>
								))
						: Object.entries(options).map((option: any) => (
								<Menu.Item key={option[0]}>
									{() => (
										<button
											onClick={(e) => setState(option[0].toLowerCase())}
											className={item}
										>
											{getSymbol(option[0])}
										</button>
									)}
								</Menu.Item>
						  ))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
