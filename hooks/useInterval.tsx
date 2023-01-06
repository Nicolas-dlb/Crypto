import { useEffect, useRef } from "react";

export default function useInterval(callback: any, delay: any) {
	const savedCallback = useRef(() => {});

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
