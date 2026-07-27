import { fetchCurrentUser } from "@/Services/serverServices";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await fetchCurrentUser();

	if (!user) {
		redirect("/login");
	}
	redirect("/manager");
}
