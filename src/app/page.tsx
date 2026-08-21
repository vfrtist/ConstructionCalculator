import { fetchCurrentUser } from "@/services/serverServices";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await fetchCurrentUser();
	console.log(user);
	if (!user) {
		redirect("/login");
	}
	redirect("/manager");
}
