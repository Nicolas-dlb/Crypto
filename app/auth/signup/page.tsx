"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import {
	getInputStyleWithStates,
	getSpanStyleWithStates,
} from "./getInputStyles";
import { validEmailRegex } from "../../../utils";
import { collection, doc, setDoc } from "firebase/firestore";

function page() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const isValidEmail = validEmailRegex.test(email);
	const isValidPassword = password.split("").length >= 6;

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const createUser = () => {
		const usersRef = collection(db, "users");

		createUserWithEmailAndPassword(auth, email, password)
			.then(async (credentials) => {
				const user = credentials.user;
				await setDoc(doc(usersRef, user.uid), {
					wallet: { bitcoin: 1, ethereum: 1, litecoin: 1 },
					usd: 20000,
				});
				router.push("/market");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	return (
		<div className="absolute w-screen h-screen flex justify-center items-center left-0 z-20 bg-slate-300">
			<div className="bg-slate-100 shadow-md rounded-md w-9/12 max-w-sm p-3 gap-2 flex flex-col justify-between items-center">
				<p className="text-base font-semibold text-slate-500">Sign up</p>
				<label
					htmlFor="email"
					className="text-start w-full font-medium text-slate-500"
				>
					Email
				</label>
				<div className={getInputStyleWithStates(email, isValidEmail)}>
					<span className={getSpanStyleWithStates(email, isValidEmail)} />
					<input
						spellCheck={false}
						onChange={handleEmailChange}
						type="text"
						name="email"
						autoComplete="off"
						placeholder="Enter your email"
						className="outline-none w-full bg-transparent transition-all rounded-md p-2 pr-0"
					/>
				</div>
				<label
					htmlFor="password"
					className="text-start w-full font-medium text-slate-500"
				>
					Password
				</label>
				<div className={getInputStyleWithStates(password, isValidPassword)}>
					<span className={getSpanStyleWithStates(password, isValidPassword)} />
					<input
						onChange={handlePasswordChange}
						type="new-password"
						spellCheck={false}
						name="password"
						autoComplete="off"
						placeholder="Enter your password"
						className="outline-none w-full bg-transparent transition-all rounded-md p-2 pr-0"
					/>
				</div>
				<div className="flex w-full h-24 md:h-fit md:my-3 flex-col items-center justify-around md:flex-row-reverse">
					<button
						onClick={createUser}
						className="rounded-md text-slate-500 shadow font-medium text-xs p-2 flex-none flex items-center justify-center w-full bg-slate-200 hover:bg-slate-300 md:w-1/3"
					>
						Create account
					</button>
					<Link
						href="/auth/login"
						className="rounded-md text-slate-500 shadow font-medium text-xs p-2 flex-none flex items-center justify-center w-full bg-slate-200 hover:bg-slate-300 md:w-1/3 pr-5 md:pr-4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="rgba(100, 116, 139, 1)"
						>
							<path d="m5 12 7 6v-5h6v-2h-6V6z"></path>
						</svg>
						<p>Login page</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default page;
