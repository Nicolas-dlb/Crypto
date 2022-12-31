import { createSlice } from "@reduxjs/toolkit";

interface walletT {
	[string: string]: number;
}

const initialState: walletT = {};

export const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		swapToken: (state, action) => {
			const tokenToSell: string = action.payload.tokenToSell;
			const amountToSell: number = action.payload.amountToSell;
			const tokenToBuy: string = action.payload.tokenToBuy;
			const amountToBuy: number = action.payload.amountToBuy;
			if (state[tokenToBuy]) {
				state[tokenToSell] -= amountToSell;
				state[tokenToBuy] += amountToBuy;
			} else {
				state[tokenToBuy] = amountToBuy;
			}
		},
		getWallet: (state, action) => {
			return (state = action.payload?.wallet);
		},
	},
});

export const { swapToken, getWallet } = walletSlice.actions;
export const selectWallet = (state: any) => state.wallet;
export default walletSlice.reducer;
