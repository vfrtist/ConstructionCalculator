import { useRef, useEffect } from "react";

export function useDebounce<T>(
	value: T | null,
	debounceFunction: (value: T) => Promise<void>,
	delay: number = 2000,
) {
	const firstRender = useRef(true);

	useEffect(() => {
		if (!value) return;

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
