import Link from "next/link";
import React from "react";

function page() {
	return (
		<div className="absolute w-screen h-screen flex justify-center items-center left-0 z-20 bg-slate-300">
			<div className="bg-slate-100 rounded-md w-9/12 max-w-sm p-3 gap-2 flex flex-col justify-between items-center">
				<p className="text-base font-semibold text-slate-500">Sign up</p>
				<label htmlFor="email" className="text-start w-full text-slate-500">
					Email
				</label>
				<input
					type="text"
					placeholder="Enter your email"
					className="outline-none w-full rounded-md p-2"
				/>
				<label htmlFor="password" className="text-start w-full text-slate-500">
					Password
				</label>
				<input
					type="password"
					placeholder="Enter your password"
					className="outline-none w-full rounded-md p-2"
				/>
				<div className="flex w-full h-24 md:h-fit md:my-3 flex-col md:flex-row-reverse items-center justify-around">
					<button className="bg-slate-200 w-full rounded-md text-slate-500 p-2 md:w-1/3">
						Create Account
					</button>
					<Link
						href="/login"
						className="bg-slate-200 rounded-md text-slate-500 p-2 flex-none flex items-center justify-center w-full md:w-1/3"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="rgba(100, 116, 139, 1)"
							className=""
						>
							<path d="m5 12 7 6v-5h6v-2h-6V6z"></path>
						</svg>
						Login page
					</Link>
				</div>
			</div>
		</div>
	);
}

export default page;
