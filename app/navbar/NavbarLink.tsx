"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Icons from "../../assets/categoryIcons";

type MenuItemProps = {
	categorie: string;
};

function NavbarLink({ categorie }: MenuItemProps) {
	const pathname = usePathname();
	const isActive = pathname?.slice(1) === categorie.toLowerCase();
	const Icon = Icons[categorie as keyof typeof Icons];

	return (
		<Link
			href={`/${categorie.toLowerCase()}`}
			className={`flex flex-col flex-1 md:flex-none p-2 md:flex-row hover:shadow items-center cursor-pointer group hover:bg-slate-400 hover:text-white hover:text-white-500 ${
				isActive ? "text-white bg-slate-400 shadow" : "text-gray-600"
			}`}
		>
			<Icon
				fill={isActive ? "white" : "#505764"}
				className="md:m-2 md:fill-[#505764] mobile:group-hover:fill-white"
			/>
			<p className="font-medium text-xs hidden md:inline-block">{categorie}</p>
		</Link>
	);
}

export default NavbarLink;
