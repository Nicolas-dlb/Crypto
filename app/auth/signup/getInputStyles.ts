export const getInputBackgroundColorWithStates = (
	state: string,
	isValidState: boolean
): string => {
	return isValidState
		? "bg-green-100"
		: !isValidState && state.split("").length > 0
		? "bg-rose-100"
		: "bg-white";
};

export const getSpanBackgroundColorWithStates = (
	state: string,
	isValidState: boolean
): string => {
	return isValidState
		? "bg-green-300"
		: !isValidState && state.split("").length > 0
		? "bg-rose-300"
		: "bg-white";
};

export const getSpanStyleWithStates = (
	state: string,
	isValidState: boolean
): string => {
	const backgroundColor = getSpanBackgroundColorWithStates(state, isValidState);
	const width = state ? "w-4 h-full" : "w-0 h-full";

	return `${width} ${backgroundColor} transition-all  rounded`;
};

export const getInputStyleWithStates = (
	state: string,
	isValidState: boolean
): string => {
	const backgroundColor = getInputBackgroundColorWithStates(
		state,
		isValidState
	);

	return `${backgroundColor} flex w-full h-9 rounded-md transition-all items-center pr-2`;
};
