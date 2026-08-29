import "@/styles/Manager.css";
import { fetchUserRecentProjects } from "@/services/projectServices";
import { fetchCurrentUserID } from "@/services/serverServices";
import { fetchAllTemplates } from "@/services/templateServices";
import ManagerEditor from "@/ui/Manager/ManagerEditor";

export default async function Manager() {
	const id = await fetchCurrentUserID();

	const [templates, recents] = await Promise.all([
		fetchAllTemplates(),
		fetchUserRecentProjects(id ?? ""),
	]);

	return <ManagerEditor templates={templates} recents={recents} />;
}
