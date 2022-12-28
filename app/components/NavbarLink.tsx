"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import "../../styles/globals.css";
import Icons from "../../assets/categoryIcons";

type MenuItemProps = {
	categorie: string;
};

function NavbarLink({ categorie }: MenuItemProps) {
	const pathname = usePathname();
	const active = pathname?.slice(1) === categorie.toLowerCase();
	const Icon = Icons[categorie as keyof typeof Icons];

	return (
		<Link
			href={`/${categorie.toLowerCase()}`}
			className={`${
				active ? "text-white bg-slate-400 shadow" : "text-gray-600"
			} flex flex-col flex-1 md:flex-none p-2 md:flex-row hover:shadow items-center cursor-pointer group hover:bg-slate-400 hover:text-white hover:text-white-500 rounded-md`}
		>
			<Icon
				fill={active ? "white" : "#505764"}
				className="md:m-2 md:fill-[#505764] mobile:group-hover:fill-white"
			/>
			<p className="font-medium text-xs hidden md:inline-block">{categorie}</p>
		</Link>
	);
}

export default NavbarLink;
