"use client";
import Link from "next/link";
import React from "react";
import { auth } from "../../firebaseConfig";
import { button, container } from "../styles/settings";
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
		<div className={container}>
			<div className="flex">
				<Label className="mb-2">Email : </Label>
				<p className="text-slate-700 ml-2 text-sm">{email}</p>
			</div>
			<Link
				href="/auth/login"
				onClick={() => user && auth.signOut()}
				className={button}
			>
				{user ? "Logout" : "Login"}
			</Link>
		</div>
	);
}

export default Settings;
