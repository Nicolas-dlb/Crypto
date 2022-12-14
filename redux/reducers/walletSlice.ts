import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
	name: "wallet",
	initialState: {
		bitcoin: 1,
		ethereum: 1,
		xrp: 1,
	},
	reducers: {
		swapToken: (state, action) => {
			const tokenToSell: string = action.payload.tokenToSell;
			const amountToSell: number = action.payload.amountToSell;
			const tokenToBuy: string = action.payload.tokenToBuy;
			const amountToBuy: number = action.payload.amountToBuy;
			if (state[tokenToBuy as keyof typeof state]) {
				state[tokenToSell as keyof typeof state] -= amountToSell;
				state[tokenToBuy as keyof typeof state] += amountToBuy;
			} else {
				state[tokenToBuy as keyof typeof state] = amountToBuy;
			}
		},
		manageToken: (state: any, action) => {
			if (state[action.payload.name]) {
				state[action.payload.name] += action.payload.amount;
			} else {
				state[action.payload.name] = action.payload.amount;
			}
		},
	},
});

export const { swapToken, manageToken } = walletSlice.actions;
export const selectWallet = (state: any) => state.wallet;
export default walletSlice.reducer;
