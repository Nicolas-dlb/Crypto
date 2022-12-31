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
	inputContainer,
	label,
	modal,
	screen,
	title,
} from "../../styles/auth";

function login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(false);

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((data) => {
				error && setError(false);
				router.push("/dashboard");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setError(true);
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

	const toggleShowPassword = () => setShowPassword(!showPassword);

	const backgroundColor = error ? "bg-rose-100" : "bg-white";

	return (
		<div className={screen}>
			<div className={modal}>
				<p className={title}>Welcome</p>
				<label htmlFor="email" className={label}>
					Email
				</label>
				<div className={inputContainer + backgroundColor}>
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
				<div className={inputContainer + backgroundColor}>
					<input
						onChange={handlePasswordChange}
						type={showPassword ? "text" : "password"}
						spellCheck={false}
						name="password"
						autoComplete="off"
						placeholder="Enter your password"
						className={input}
					/>
					{showPassword ? (
						<svg
							onClick={toggleShowPassword}
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							className="cursor-pointer"
							fill="rgba(100, 116, 139, 1)"
						>
							<path d="M8.073 12.194 4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 0 1-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0 1 12.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 0 1-.587 2.053l-1.507-1.507z"></path>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							className="cursor-pointer"
							fill="rgba(100, 116, 139, 1)"
							onClick={toggleShowPassword}
						>
							<path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"></path>
							<path d="M12 10c-1.084 0-2 .916-2 2s.916 2 2 2 2-.916 2-2-.916-2-2-2z"></path>
						</svg>
					)}
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
