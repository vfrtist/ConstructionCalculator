import "@/styles/main.css";
import "@/styles/colors.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Construction Board Calculator",
	description: "Cut length optimizer for boards.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
