import Header from "@/ui/Generic/Header";
import { fetchCurrentUser } from "@/services/serverServices";
import { redirect } from "next/navigation";

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await fetchCurrentUser();
	if (!user) {
		redirect("/login");
	}
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}
