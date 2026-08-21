import "@/styles/main.css";
import "@/styles/colors.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Suspense } from "react";
import Splash from "@/ui/Generic/Splash";

export const metadata: Metadata = {
	title: "Construction Board Calculator",
	description: "Cut length optimizer for boards.",
};

const font = Quicksand({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={font.className}>
			<body>
				<Suspense fallback={<Splash />}>{children}</Suspense>
			</body>
		</html>
	);
}
