import React from "react";
import { error } from "../styles/exchange";

function Error({ classNames, children }: any) {
	return <p className={`${error} ${classNames}`}>{children}</p>;
}

export default Error;
