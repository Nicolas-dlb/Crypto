import Link from "next/link";
import React from "react";
import "../styles/globals.css";

type MenuItemProps = {
	categorie: string;
};

function MenuItem({ categorie }: MenuItemProps) {
	return (
		<Link
			href={`/${categorie}`}
			className="flex grou flex-col p-2 pl-3 pr-3 md:flex-row items-center cursor-pointer hover:bg-slate-700/5 hover:text-white-500 rounded-sm"
		>
			<img
				src={`/icons/${categorie.toLowerCase()}.svg`}
				height="25px"
				width="25px"
				alt=""
				className="md:m-2"
			/>
			<p className="text-gray-500 ">{categorie}</p>
		</Link>
	);
}

export default MenuItem;
