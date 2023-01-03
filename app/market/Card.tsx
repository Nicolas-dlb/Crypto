import Image from "next/image";
import React from "react";
import { Crypto } from "../../typing";
import { getNumberFixed } from "../../utils";

function Card(crypto: Crypto) {
	const priceChangeColor =
		crypto?.price_change_percentage_24h > 0 ? "text-teal-500" : "text-rose-500";

	return (
		<div className="bg-slate-100 shadow flex items-center rounded-md m-2 p-3 text-center text-slate-700 font-medium justify-between">
			<Image
				src={crypto?.image}
				className="h-fit"
				priority={true}
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
				className={`${priceChangeColor} w-1/6 m-0 p-0 items-center flex h-fit xs:hidden`}
			>
				<p> {getNumberFixed(crypto?.price_change_percentage_24h, 2)}%</p>
			</div>
		</div>
	);
}

export default Card;
