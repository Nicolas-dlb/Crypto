"use client";
import Link from "next/link";
import React from "react";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Label from "../components/Label";

function Settings() {
	const [user] = useAuthState(auth);

	const email = user?.email
		? user.email
		: user?.isAnonymous
		? "Demo account"
		: "N/A";

	return (
		<div className="bg-slate-100 shadow flex-col flex justify-around rounded-md p-4 m-2">
			<div className="flex">
				<Label className="mb-2">Email : </Label>
				<p className="text-slate-700 ml-2 text-sm">{email}</p>
			</div>
			<Link
				href="/auth/login"
				onClick={() => user && auth.signOut()}
				className="bg-slate-200 w-28 hover:bg-slate-300 rounded-md text-slate-500 shadow font-medium text-xs p-2 flex-none flex items-center justify-center"
			>
				{user ? "Logout" : "Login"}
			</Link>
		</div>
	);
}

export default Settings;
