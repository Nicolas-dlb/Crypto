import { createSlice } from "@reduxjs/toolkit";

export const marketSlice = createSlice({
	name: "wallet",
	initialState: {
		market: [],
	},
	reducers: {
		getMarket: (state, action) => {
			state.market = action.payload;
		},
	},
});

export const { getMarket } = marketSlice.actions;
export const selectMarket = (state: any) => state.market.market;
export default marketSlice.reducer;
