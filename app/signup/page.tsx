"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { auth } from "../../firebaseConfig";
import { getBackgroundColorWithStates, getSpanColorWithStates } from "./styles";

function page() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	const isValidEmail = validEmailRegex.test(email);
	const isValidPassword = password.split("").length >= 6;

	const emailBackgroundColor = getBackgroundColorWithStates(
		email,
		isValidEmail
	);
	const passwordBackgroundColor = getBackgroundColorWithStates(
		password,
		isValidPassword
	);

	const emailSpanColor = getSpanColorWithStates(email, isValidEmail);
	const passwordSpanColor = getSpanColorWithStates(password, isValidPassword);

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const createUser = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((user) => {
				router.push("/dashboard");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	return (
		<div className="absolute w-screen h-screen flex justify-center items-center left-0 z-20 bg-slate-300">
			<form className="bg-slate-100 shadow-md rounded-md w-9/12 max-w-sm p-3 gap-2 flex flex-col justify-between items-center">
				<p className="text-base font-semibold text-slate-500">Sign up</p>
				<label
					htmlFor="email"
					className="text-start w-full font-medium text-slate-500"
				>
					Email
				</label>
				<div
					className={`flex w-full rounded-md transition-all ${emailBackgroundColor}`}
				>
					{
						<span
							className={`${email ? "w-4" : "w-0"} 
						 transition-all ${emailSpanColor} rounded`}
						/>
					}
					<input
						spellCheck={false}
						onChange={handleEmailChange}
						type="text"
						autoComplete="off"
						placeholder="Enter your email"
						className="outline-none w-full bg-transparent rounded-md p-2"
					/>
				</div>
				<label
					htmlFor="password"
					className="text-start w-full font-medium text-slate-500"
				>
					Password
				</label>
				<div
					className={`flex w-full rounded-md transition-all ${passwordBackgroundColor}`}
				>
					<span
						className={`transition-all ${
							password ? "w-4" : "w-0"
						} ${passwordSpanColor} rounded`}
					/>

					<input
						onChange={handlePasswordChange}
						type="new-password"
						name="password"
						autoComplete="off"
						placeholder="Enter your password"
						className="outline-none w-full bg-transparent transition-all rounded-md p-2"
					/>
				</div>
				<div className="flex w-full h-24 md:h-fit md:my-3 flex-col md:flex-row-reverse items-center justify-around">
					<button
						onClick={createUser}
						className="bg-slate-200 w-full hover:bg-slate-300 rounded-md text-xs font-medium shadow text-slate-500 p-2 md:w-1/3"
					>
						Create account
					</button>
					<Link
						href="/login"
						className="bg-slate-200 hover:bg-slate-300 rounded-md text-slate-500 shadow font-medium text-xs p-2 flex-none flex items-center justify-center w-full md:w-1/3"
					>
						<div className="flex items-center w-full justify-center relative right-1.5 md:right-0">
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
						</div>
					</Link>
				</div>
			</form>
		</div>
	);
}

export default page;
