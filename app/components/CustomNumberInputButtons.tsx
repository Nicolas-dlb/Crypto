import React, { Ref, RefObject, useState } from "react";
import useInterval from "../../hooks/useInterval";

interface CustomNumberInputArrowsProps {
	inputRef: RefObject<HTMLInputElement>;
	setValue: (newValue: string) => void;
}

function CustomNumberInputButtons({
	inputRef,
	setValue,
}: CustomNumberInputArrowsProps) {
	const [isMouseDown, setMouseDown] = useState(false);
	const [changeType, setChangeType] = useState<string>("increment");

	const updateValue = () => setValue(inputRef.current!.value);

	const changeValue = () => {
		changeType === "increment"
			? inputRef.current?.stepUp()
			: inputRef.current?.stepDown();
		updateValue();
	};

	useInterval(changeValue, isMouseDown ? 130 : null);

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<button
				className="shadow bg-gray-50 hover:bg-gray-100 px-2 w-5 flex items-center justify-center h-2/4 rounded-t rounded-tr-none"
				onClick={() => changeValue()}
				onMouseDown={() => setMouseDown(true)}
				onMouseUp={() => setMouseDown(false)}
				onMouseOver={() => setChangeType("increment")}
			>
				+
			</button>
			<button
				className="shadow bg-gray-50 hover:bg-gray-100 px-2 w-5 flex items-center justify-center h-2/4 rounded-b rounded-br-none"
				onClick={() => changeValue()}
				onMouseDown={() => setMouseDown(true)}
				onMouseUp={() => setMouseDown(false)}
				onMouseOver={() => setChangeType("decrement")}
			>
				-
			</button>
		</div>
	);
}

export default CustomNumberInputButtons;
