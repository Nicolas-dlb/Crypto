"use client";
import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOutsideClick";
import { Crypto } from "../../typing";
import { button, container, item, menu } from "../styles/dropdown";

interface DropdownProps {
	selectedToken: Crypto | undefined;
	setSelectedToken: (token: Crypto) => void;
	options: Crypto[] | undefined;
}
function Dropdown({ selectedToken, setSelectedToken, options }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [filteredOptions, setFilteredOptions] = useState<Crypto[]>();
	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref, () => setIsOpen(false));

	useEffect(() => {
		if (options && !selectedToken) setSelectedToken(options[0]);

		setFilteredOptions(
			options?.filter((token) => token.name !== selectedToken?.name)
		);
	}, [options, selectedToken]);

	return (
		<div ref={ref} className={container}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={button + " rounded-l-none"}
			>
				{selectedToken?.symbol.toUpperCase()}
				<svg
					fill="#000000"
					height="24px"
					className="-rotate-90 scale-50"
					width="24px"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="-49 -49 588.00 588.00"
					stroke="#000000"
					stroke-width="11.76"
				>
					<g stroke-linecap="round" id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g stroke-linecap="round" id="SVGRepo_iconCarrier">
						{" "}
						<polygon
							stroke-linecap="round"
							points="410.312,454.729 151.767,244.996 410.312,35.271 381.693,0 79.688,244.996 381.693,490 "
						></polygon>{" "}
					</g>
				</svg>
			</button>
			<div className={menu + `${!isOpen && "opacity-0 invisible"}`}>
				{filteredOptions?.map((token: Crypto) => (
					<button
						className={item}
						onClick={() => {
							setSelectedToken(token);
							setIsOpen(false);
						}}
					>
						{token.symbol.toUpperCase()}
					</button>
				))}
			</div>
		</div>
	);
}

export default Dropdown;
