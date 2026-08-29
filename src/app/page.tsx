import { fetchCurrentUserID } from "@/services/serverServices";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await fetchCurrentUserID();
	if (!user) {
		redirect("/login");
	}
	redirect("/manager");
}
