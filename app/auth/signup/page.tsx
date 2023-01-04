"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
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
		<div className={screen}>
			<div className={modal}>
				<p className={title}>Sign up</p>
				<label htmlFor="email" className={label}>
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
				<div className={buttonsGroup + "md:flex-row-reverse"}>
					<button onClick={createUser} className={button}>
						Create account
					</button>
					<Link href="/auth/login" className={button + "pr-5 md:pr-4"}>
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
