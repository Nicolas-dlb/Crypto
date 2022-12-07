import React from "react";

function loading() {
	const Spinner = () => (
		<div className="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
	return (
		<div className="h-full w-80 flex justify-center items-center">
			<Spinner />
		</div>
	);
}

export default loading;
