"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectMoney } from "../../../redux/reducers/walletSlice";
import { getNumberFixed, numberWithSpaces } from "../../../utils";

function UserMoney() {
	const usd = useSelector(selectMoney);

	return (
		<div className="flex justify-end items-center w-fit flex-none p-1 px-2 mb-1 bg-slate-100 rounded">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="rgba(100, 116, 139, 1)"
			>
				<circle cx="15.5" cy="13.5" r="2.5"></circle>
				<path d="M12 13.5c0-.815.396-1.532 1-1.988A2.47 2.47 0 0 0 11.5 11a2.5 2.5 0 1 0 0 5 2.47 2.47 0 0 0 1.5-.512 2.486 2.486 0 0 1-1-1.988z"></path>
				<path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 18V6h16l.002 12H4z"></path>
			</svg>
			<div className="text-slate-600 ml-2 text-xs font-semibold">
				{numberWithSpaces(getNumberFixed(usd, 2))} $
			</div>
		</div>
	);
}

export default UserMoney;
