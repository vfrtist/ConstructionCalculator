import "@/styles/main.css";
import "@/styles/colors.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Construction Board Calculator",
	description: "Cut length optimizer for boards.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<main>
					{children}
					<ul>
						<h1>Navigation</h1>
						<li>
							<Link href="/login">Login</Link>
						</li>
						<li>
							<Link href="/manager">Manager</Link>
						</li>
					</ul>
				</main>
			</body>
		</html>
	);
}
