import React from "react";
import "../styles/globals.css";
import NavbarLink from "./components/NavbarLink";

function Navbar() {
	return (
		<nav
			className={`flex md:justify-start z-10 sticky w-full min-w-400 justify-around md:top-0 bg-white shadow md:flex-col md:w-60 rounded-t-md md:h-screen box-border`}
		>
			<NavbarLink categorie="Dashboard" />
			<NavbarLink categorie="Wallet" />
			<NavbarLink categorie="Settings" />
		</nav>
	);
}

export default Navbar;
