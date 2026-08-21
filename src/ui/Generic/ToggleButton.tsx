export interface ToggleButtonProps<T> {
	value: T;
	caption: string;
	isActive?: boolean;
	onClick?: (value: T) => void;
}

export default function ToggleButton<T>({
	value,
	caption,
	isActive,
	onClick,
}: ToggleButtonProps<T>) {
	return (
		<button
			className={`ToggleButton ${isActive ? "active" : ""}`}
			onClick={() => onClick?.(value)}
		>
			{caption}
		</button>
	);
}
