import React from "react";
import "../styles/globals.css";
import MenuItem from "./MenuItem";

function Navbar() {
	return (
		<div>
			<nav
				className={`flex md:justify-start fixed w-full justify-around md:top-0 bg-white shadow md:flex-col md:w-60 md:rounded-md md:h-screen box-border`}
			>
				<MenuItem categorie="Dashboard" />
				<MenuItem categorie="Wallet" />
				<MenuItem categorie="Settings" />
			</nav>
		</div>
	);
}

export default Navbar;
