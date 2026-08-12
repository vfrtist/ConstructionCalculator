import React, { useMemo } from "react";
import "@/styles/ToggleButtonGroup.css";
import { ToggleButtonProps } from "./ToggleButton";

export interface SettingsGroupProp<T> {
	children: React.ReactElement<ToggleButtonProps<T>>[];
	activeValue?: T;
	onChange?: (value: T) => void;
}

export default function ToggleButtonGroup<T>({
	children,
	activeValue,
	onChange,
}: SettingsGroupProp<T>) {
	// if no active value is given, take the first active value
	const currentValue = activeValue ?? children[0]?.props.value;
	const size: number = 100 / children.length;
	const buttonMap: Record<string, number> = useMemo(() => {
		const map: Record<string, number> = {};
		children.map((child, index) => {
			map[String(child.props.value)] = size * index;
		});
		return map;
	}, [children, size]);

	return (
		<div
			className="ToggleButtonGroup"
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${children.length}, 1fr)`,
			}}
		>
			{children.map((child, index) =>
				React.cloneElement(child, {
					key: index,
					isActive: child.props.value === currentValue,
					onClick: onChange,
				}),
			)}
			<div
				className="Cursor"
				style={{
					width: `${size}%`,
					left: `${buttonMap[String(currentValue)]}%`,
				}}
			></div>
		</div>
	);
}
