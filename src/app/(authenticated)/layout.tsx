import { redirect } from "next/navigation";
import { fetchCurrentUserID } from "@/services/serverServices";
import { headers } from "next/headers";

export default async function AuthenticatedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await fetchCurrentUserID();

	if (!user) {
		const headersList = await headers();
		const pathname = headersList.get("x-nextjs-url") ?? "/";
		redirect(`/login?returnTo=${encodeURIComponent(pathname)}`);
	}

	return <>{children}</>;
}
