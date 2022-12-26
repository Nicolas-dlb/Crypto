import React from "react";
import "../styles/globals.css";
import NavbarLink from "./components/NavbarLink";

function Navbar() {
	return (
		<nav className="flex md:justify-start z-10 sticky w-full justify-around md:top-0 bg-slate-100 shadow md:flex-col md:min-w-[200px] md:max-w-[200px] rounded-t-md md:h-screen box-border">
			<NavbarLink categorie="Dashboard" />
			<NavbarLink categorie="Wallet" />
			<NavbarLink categorie="Settings" />
		</nav>
	);
}

export default Navbar;
