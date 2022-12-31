"use client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebaseConfig";
import { getWallet } from "../../redux/reducers/walletSlice";

function WalletProvider({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const userDoc = doc(db, `users/${user.uid}`);
			onSnapshot(userDoc, (snap: any) => {
				dispatch(getWallet(snap.data()));
			});
		}
	});

	return <>{children}</>;
}

export default WalletProvider;
