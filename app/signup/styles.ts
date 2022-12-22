export const getBackgroundColorWithStates = (
	property: string,
	isValidProperty: boolean
): string => {
	return isValidProperty
		? "bg-green-100"
		: !isValidProperty && property.split("").length > 0
		? "bg-rose-100"
		: "bg-white";
};

export const getSpanColorWithStates = (
	property: string,
	isValidProperty: boolean
): string => {
	return isValidProperty
		? "bg-green-300"
		: !isValidProperty && property.split("").length > 0
		? "bg-rose-300"
		: "bg-white";
};
