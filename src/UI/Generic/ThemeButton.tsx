import React from "react";
import "@/styles/ThemeButton.css";

export default function ThemeButton({
	children,
	...buttonProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...buttonProps}
			className={`ThemeButton ${buttonProps.className || ""}`}
		>
			{children}
		</button>
	);
}
