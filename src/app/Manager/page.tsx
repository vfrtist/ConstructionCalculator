import FileGroup from "@/UI/Manager/FileGroup";
import "@/Stylings/Manager.css";
import { fetchUserRecentProjects } from "@/Services/projectServices";
import { fetchCurrentUser } from "@/Services/serverServices";
import { fetchAllTemplates } from "@/Services/templateServices";
import { redirect } from "next/navigation";

export default async function Manager() {
	const user = await fetchCurrentUser();

	if (!user) {
		redirect("/login");
	}
	const [templates, recents] = await Promise.all([
		fetchAllTemplates(),
		fetchUserRecentProjects(user.id),
	]);

	return (
		<>
			<h1>Manager</h1>
			<FileGroup title={"Recent"} files={recents} type={"project"} />
			<FileGroup title={"New"} files={templates} type={"template"} />
		</>
	);
}
