import "@/styles/Manager.css";
import { fetchUserRecentProjects } from "@/services/projectServices";
import { fetchCurrentUser } from "@/services/serverServices";
import { fetchAllTemplates } from "@/services/templateServices";
import { redirect } from "next/navigation";
import ManagerEditor from "@/ui/Manager/ManagerEditor";

export default async function Manager() {
	const user = await fetchCurrentUser();

	if (!user) {
		redirect("/login");
	}
	const [templates, recents] = await Promise.all([
		fetchAllTemplates(),
		fetchUserRecentProjects(user.id),
	]);

	return <ManagerEditor templates={templates} recents={recents} />;
}
