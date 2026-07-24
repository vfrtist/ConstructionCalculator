import FileGroup from "@/UI/Manager/FileGroup";
import "@/Stylings/Manager.css";
import {
	getAllTemplates,
	getCurrentUser,
	getUserRecentProjects,
} from "@/Services/ProjectServices";

export default async function Manager() {
	const user = await getCurrentUser();
	const [templates, recents] = await Promise.all([
		getAllTemplates(),
		getUserRecentProjects(user.id),
	]);
	return (
		<>
			<h1>Manager</h1>
			<FileGroup title={"Recent"} files={recents} type={"project"} />
			<FileGroup title={"New"} files={templates} type={"template"} />
		</>
	);
}
