import React from "react";

function Error({ classNames, children }: any) {
	return (
		<p className={`text-[#d27d88] text-[12.5px] font-medium ${classNames}`}>
			{children}
		</p>
	);
}

export default Error;
