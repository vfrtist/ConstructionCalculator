import { useRef, useEffect } from "react";

export function useAutoSave<T>(
	value: T,
	save: (value: T) => Promise<void>,
	delay = 2000,
) {
	const firstRender = useRef(true);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}

		const timeout = setTimeout(() => {
			save(value);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, save, delay]);
}
