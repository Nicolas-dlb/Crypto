import React from "react";
import "../styles/globals.css";
import MenuItem from "./MenuItem";

function Navbar() {
	return (
		<nav
			className={`flex md:justify-start z-10 sticky w-full min-w-400 justify-around md:top-0 bg-white shadow md:flex-col md:w-60 rounded-r-md md:h-screen box-border`}
		>
			<MenuItem categorie="Dashboard" />
			<MenuItem categorie="Wallet" />
			<MenuItem categorie="Settings" />
		</nav>
	);
}

export default Navbar;
