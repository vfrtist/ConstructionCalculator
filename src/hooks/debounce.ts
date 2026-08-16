import { useRef, useEffect } from "react";

export function useDebounce<T>(
	value: T,
	debounceFunction: (value: T) => Promise<void>,
	delay: number = 2000,
) {
	const firstRender = useRef(true);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}

		const timeout = setTimeout(() => {
			debounceFunction(value);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, debounceFunction, delay]);
}
