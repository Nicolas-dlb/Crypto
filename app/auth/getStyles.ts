import { inputContainer } from "../styles/auth";

export const getInputBackgroundColorWithStates = (
	property: string,
	isValidProperty: boolean
): string => {
	return isValidProperty
		? "bg-green-100"
		: !isValidProperty && property.split("").length > 0
		? "bg-rose-100"
		: "bg-white";
};

export const getSpanBackgroundColorWithStates = (
	property: string,
	isValidProperty: boolean
): string => {
	return isValidProperty
		? "bg-green-300"
		: !isValidProperty && property.split("").length > 0
		? "bg-rose-300"
		: "bg-white";
};

export const getSpanStyleWithStates = (
	property: string,
	isValidProperty: boolean
): string => {
	const backgroundColor = getSpanBackgroundColorWithStates(
		property,
		isValidProperty
	);
	const width = property ? "w-4 h-full" : "w-0";

	return `${width} transition-all ${backgroundColor} rounded`;
};

export const getInputStyleWithStates = (
	property: string,
	isValidProperty: boolean
): string => {
	const backgroundColor = getInputBackgroundColorWithStates(
		property,
		isValidProperty
	);

	return inputContainer + backgroundColor;
};
