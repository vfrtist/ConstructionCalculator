import FileGroup from "@/ui/Manager/FileGroup";
import "@/styles/Manager.css";
import { fetchUserRecentProjects } from "@/services/projectServices";
import { fetchCurrentUser } from "@/services/serverServices";
import { fetchAllTemplates } from "@/services/templateServices";
import { notFound } from "next/navigation";

export default async function Manager() {
	const user = await fetchCurrentUser();

	if (!user) {
		notFound();
	}
	const [templates, recents] = await Promise.all([
		fetchAllTemplates(),
		fetchUserRecentProjects(user.id),
	]);

	return (
		<>
			<FileGroup title={"Recent"} files={recents} type={"project"} />
			<FileGroup title={"New"} files={templates} type={"template"} />
		</>
	);
}
