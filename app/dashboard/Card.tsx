import Image from "next/image";
import React from "react";
import { Crypto } from "../../typing";
import { getNumberFixed } from "../../utils";

function card(crypto: Crypto): JSX.Element {
	const priceChangeColor =
		crypto?.price_change_percentage_24h > 0 ? "text-rose-500" : "text-teal-500";

	return (
		<div
			key={crypto.id}
			className="bg-slate-100 flex items-center rounded-md m-2 p-3 text-center  justify-between"
		>
			<Image
				src={crypto?.image}
				className="h-fit"
				width="20"
				height="20"
				alt=""
			/>

			<div className="w-1/5 text-start  m-0 p-0 items-center flex h-fit">
				<p className="">{crypto?.name}</p>
			</div>
			<div className="w-1/5 text-start m-0 p-0 items-center flex h-fit">
				<p>{getNumberFixed(crypto?.current_price, 2)}$</p>
			</div>
			<div
				className={`${priceChangeColor} w-1/6 m-0 p-0 items-center flex h-fit`}
			>
				<p> {getNumberFixed(crypto?.price_change_percentage_24h, 2)}%</p>
			</div>
		</div>
	);
}

export default card;
