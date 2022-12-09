import Link from "next/link";
import React from "react";
import "../../styles/globals.css";

type MenuItemProps = {
	categorie: string;
};

function NavbarLink({ categorie }: MenuItemProps) {
	return (
		<Link
			href={`/${categorie.toLowerCase()}`}
			className="flex flex-col flex-1 md:flex-none p-2 md:flex-row items-center cursor-pointer hover:bg-slate-700/5 hover:text-white-500 rounded-sm"
		>
			<img
				src={`/icons/${categorie.toLowerCase()}.svg`}
				height="23px"
				width="23px"
				alt=""
				className="md:m-2"
			/>
			<p className="text-gray-500 text-xs">{categorie}</p>
		</Link>
	);
}

export default NavbarLink;
