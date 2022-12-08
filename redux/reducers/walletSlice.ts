import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
	name: "wallet",
	initialState: {
		bitcoin: 1,
		ethereum: 0.9847432,
		ripple: 0.0343,
		eur: 1000000,
	},
	reducers: {
		swapTokens: (state, action) => {
			const tokenToSell: string = action.payload.swap;
			const amount: number = action.payload.amount;
			const tokenToBuy: string = action.payload.for;
			state = state;
		},
	},
});

export const { swapTokens } = appSlice.actions;
export const selectWallet = (state: any) => state.wallet;
export default appSlice.reducer;
