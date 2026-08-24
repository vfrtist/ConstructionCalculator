import { redirect } from "next/navigation";
import { fetchCurrentUser } from "@/services/serverServices";

export default async function AuthenticatedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await fetchCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return <>{children}</>;
}
