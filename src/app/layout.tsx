import "@/styles/main.css";
import "@/styles/colors.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Suspense } from "react";
import Splash from "@/ui/Generic/Splash";

export const metadata: Metadata = {
	title: "Construction Board Calculator",
	description:
		"Plan and optimize your construction board cuts with an easy-to-use cutting calculator.",

	openGraph: {
		title: "Construction Board Calculator",
		description:
			"Plan and optimize your construction board cuts with an easy-to-use cutting calculator.",
		url: "https://bord-alpha.vercel.app",
		siteName: "Construction Board Calculator",
		images: [
			{
				url: "/resources/BORD-OG-Image.png",
				width: 1200,
				height: 630,
				alt: "Construction Board Calculator",
			},
		],
		type: "website",
	},

	twitter: {
		card: "summary_large_image",
		title: "Construction Board Calculator",
		description:
			"Plan and optimize your construction board cuts with an easy-to-use cutting calculator.",
		images: ["/resources/BORD-OG-Image.png"],
	},
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
