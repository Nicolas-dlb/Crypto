import { createSlice } from "@reduxjs/toolkit";

interface walletT {
	wallet: { [string: string]: number };
	usd: number | null;
}

const initialState: walletT = {
	wallet: {},
	usd: null,
};

export const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		swapToken: (state, action) => {
			const tokenToSell: string = action.payload.tokenToSell;
			const amountToSell: number = action.payload.amountToSell;
			const tokenToBuy: string = action.payload.tokenToBuy;
			const amountToBuy: number = action.payload.amountToBuy;
			if (state.wallet[tokenToBuy]) {
				state.wallet[tokenToSell] -= amountToSell;
				state.wallet[tokenToBuy] += amountToBuy;
			} else {
				state.wallet[tokenToBuy] = amountToBuy;
			}
		},
		getWallet: (state, action) => {
			state.wallet = action.payload?.wallet;
			state.usd = action.payload?.usd;
		},
	},
});

export const { swapToken, getWallet } = walletSlice.actions;
export const selectWallet = (state: any) => state.wallet.wallet;
export const selectMoney = (state: any) => state.wallet.usd;
export default walletSlice.reducer;
