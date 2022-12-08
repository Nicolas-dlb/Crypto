import React, { KeyboardEvent, useState } from "react";

function Exchange() {
	const [input, setInput] = useState("");
	function isNumberKey(evt: KeyboardEvent<HTMLInputElement>): boolean {
		var charCode = evt.which ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
		return true;
	}
	return (
		<div className="bg-slate-100 h-40 flex-col flex justify-between rounded-md p-4">
			<div className="text-start">
				<h3 className="text-sm text-slate-600">Swap</h3>
				<div className="bg-white rounded-md flex justify-between w-full">
					<input
						onKeyPress={(e) => isNumberKey(e)}
						onChange={(e) => {
							// const numberPattern = /[0-9\/]+/;
							// if (numberPattern.test(e.key))
							console.log(e);
							setInput(e.target.value);
						}}
						type="number"
						min="0"
						pattern="[0-9\.]+"
						className="bg-transparent w-full outline-none"
					/>
					<select className="rounded-md outline-none">
						<option value="Bitcoin">BTC</option>
						<option value="Bitcoin">USD</option>
						<option value="Bitcoin">EUR</option>
					</select>
				</div>
				<h3 className="text-sm text-slate-600">For</h3>
				<div className="mt-2 md:mt-0 bg-slate-200 flex justify-between w-full rounded-md">
					<p className="w-full" />
					<select className="rounded-md bg-slate-200 outline-none text-slate-400">
						<option value="Bitcoin">BTC</option>
						<option value="Bitcoin">USD</option>
						<option value="Bitcoin">EUR</option>
					</select>
				</div>
			</div>
			<button className="bg-slate-300 text-white rounded-md w-full h-8 mt-4">
				Exchange
			</button>
		</div>
	);
}

export default Exchange;
