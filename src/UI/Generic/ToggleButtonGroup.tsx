import React from "react";
import "@/styles/ToggleButtonGroup.css";
import { ToggleButtonProps } from "./ToggleButton";

export interface SettingsGroupProp<T> {
	name?: string;
	children: React.ReactElement<ToggleButtonProps<T>>[];
	activeValue?: T;
	onChange?: (value: T) => void;
}

export default function ToggleButtonGroup<T>({
	name,
	children,
	activeValue,
	onChange,
}: SettingsGroupProp<T>) {
	// if no active value is given, take the first active value
	const currentValue = activeValue ?? children[0]?.props.value;

	return (
		<div className="ToggleButtonGroup container">
			{name && <h3>{name}</h3>}
			<div className="ButtonGroup">
				{children.map((child, index) =>
					React.cloneElement(child, {
						key: index,
						isActive: child.props.value === currentValue,
						onClick: onChange,
					}),
				)}
			</div>
		</div>
	);
}
