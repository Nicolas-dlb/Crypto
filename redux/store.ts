import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./reducers/walletSlice";
import marketReducer from "./reducers/marketSlice";

export const store = configureStore({
	reducer: {
		wallet: walletReducer,
		market: marketReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
