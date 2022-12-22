"use client";
import React from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

function login() {
	const router = useRouter();

	const signIn = () => {
		signInAnonymously(auth)
			.then((data) => {
				router.push("/dashboard");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ...
			});
	};

	return (
		<div className="absolute w-screen h-screen flex justify-center items-center left-0 z-20 bg-slate-300">
			<div className="bg-slate-100 rounded-md w-9/12 max-w-sm p-3 gap-2 flex flex-col justify-between items-center">
				<p className="text-base font-semibold text-slate-500">Welcome</p>
				<label htmlFor="email" className="text-start w-full text-slate-500">
					Email
				</label>
				<input
					type="text"
					name="email"
					placeholder="Enter your email"
					className="outline-none w-full rounded-md p-2"
					autoComplete="off"
				/>
				<label htmlFor="password" className="text-start w-full text-slate-500">
					Password
				</label>
				<input
					type="password"
					name="password"
					autoComplete="new-password"
					placeholder="Enter your password"
					className="outline-none w-full rounded-md p-2"
				/>

				<div className="flex w-full h-24 md:h-fit md:my-3 flex-col md:flex-row items-center justify-around">
					<button
						onClick={signIn}
						className="bg-slate-200 rounded-md text-slate-500 p-2 flex-none w-full md:w-1/3"
					>
						login
					</button>
					<button
						onClick={signIn}
						className="bg-slate-200 rounded-md text-slate-500 p-2 flex-none flex items-center justify-center gap-2 w-full md:w-1/3"
					>
						Demo account
					</button>
				</div>
				<p className="text-xs text-slate-500">
					Not registered yet ?{" "}
					<Link href="/signup" className="text-slate-600">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default login;
