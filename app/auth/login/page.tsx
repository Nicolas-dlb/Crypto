"use client";
import React, { ChangeEvent, useState } from "react";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	button,
	buttonsGroup,
	input,
	label,
	modal,
	screen,
	title,
} from "../../styles/auth";
import { getInputStyleWithStates, getSpanStyleWithStates } from "../getStyles";
import { validEmailRegex } from "../../../utils";

function login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const isValidEmail = validEmailRegex.test(email);
	const isValidPassword = password.split("").length >= 6;

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((data) => {
				router.push("/dashboard");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ...
			});
	};
	const signInDemoAccount = () => {
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
		<div className={screen}>
			<div className={modal}>
				<p className={title}>Welcome</p>
				<label htmlFor="email" className={label}>
					Email
				</label>
				<div className={getInputStyleWithStates(email, isValidEmail)}>
					<span className={getSpanStyleWithStates(email, isValidEmail)} />
					<input
						onChange={handleEmailChange}
						type="email"
						spellCheck={false}
						name="email"
						autoComplete="off"
						placeholder="Enter your email"
						className={input}
					/>
				</div>
				<label htmlFor="password" className={label}>
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
						className={input}
					/>
				</div>
				<div className={buttonsGroup}>
					<button onClick={signIn} className={button}>
						login
					</button>
					<button onClick={signInDemoAccount} className={button}>
						Demo account
					</button>
				</div>
				<p className="text-xs text-slate-500 font-medium">
					Not registered yet ?{" "}
					<Link href="/auth/signup" className="text-slate-600 underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default login;
