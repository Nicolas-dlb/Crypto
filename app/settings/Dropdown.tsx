"use client";
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { selectMarket } from "../../redux/reducers/marketSlice";
import { useSelector } from "react-redux";
import { Crypto } from "../../typing";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
	state,
	setState,
	options,
	tokenToSellName,
}: any) {
	const backgroundColor = options["bitcoin"]
		? "bg-gray-50 shadow"
		: "bg-gray-50";
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
		<Menu as="div" className="relative inline-block text-left">
			<div className="h-full w-30">
				<Menu.Button
					className={`inline-flex w-24 xs:w-20 justify-end rounded-md border-gray-300 ${backgroundColor} px-4 xs:px-2 h-full items-center text-sm xs:text-xs font-medium text-gray-700 shadow-sm focus:outline-none  focus:ring-offset-gray-100`}
				>
					{isMarketDropdown && state === tokenToSellName
						? options
								.filter(
									(crypto: Crypto) => crypto.name.toLowerCase() != state
								)[0]
								.symbol.toUpperCase()
						: crypto?.symbol.toUpperCase()}
					<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-36 xs:w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-scroll min-h-full max-h-40">
					<div className="py-1">
						{isMarketDropdown
							? options
									.filter(
										(crypto: Crypto) =>
											crypto.name.toLowerCase() != tokenToSellName.toLowerCase()
									)
									.map((option: Crypto) => (
										<Menu.Item key={option.name}>
											{({ active }) => (
												<button
													onClick={(e: any) =>
														setState(option.name.toLowerCase())
													}
													className={classNames(
														active
															? "bg-gray-100 text-gray-900"
															: "text-gray-700",
														"block w-full text-start px-4 py-2 text-sm xs:text-xs"
													)}
												>
													{option.symbol.toUpperCase()}
												</button>
											)}
										</Menu.Item>
									))
							: Object.entries(options).map((option: any) => (
									<Menu.Item key={option[0]}>
										{({ active }) => (
											<button
												onClick={(e) => setState(option[0].toLowerCase())}
												className={classNames(
													active
														? "bg-gray-100 text-gray-900"
														: "text-gray-700",
													"block w-full text-start px-4 py-2 text-sm xs:text-xs"
												)}
											>
												{getSymbol(option[0])}
											</button>
										)}
									</Menu.Item>
							  ))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
