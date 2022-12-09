import React from "react";
import Spinner from "../components/Spinner";

function loading() {
	return (
		<div className="h-full w-full flex justify-center items-center">
			<Spinner />
		</div>
	);
}

export default loading;
