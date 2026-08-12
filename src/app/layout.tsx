import "@/styles/main.css";
import "@/styles/colors.css";
import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import { Suspense } from "react";
import Splash from "@/ui/Generic/Splash";

export const metadata: Metadata = {
	title: "Construction Board Calculator",
	description: "Cut length optimizer for boards.",
};

const comissioner = Commissioner({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={comissioner.className}>
			<body>
				<Suspense fallback={<Splash />}>{children}</Suspense>
			</body>
		</html>
	);
}
