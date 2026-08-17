import { useContext } from "react";
import { ManagerContext } from "@/app/manager/ManagerEditor";
import { ProjectSummary } from "@/lib/structures";
import { newProjectSummary } from "@/lib/objects";
import Icon from "@/ui/Generic/Icon";
import Link from "next/link";

export default function ProjectTile(project: ProjectSummary) {
	const { toggleSidebar, activeProject, updateProject } =
		useContext(ManagerContext);

	return (
		<>
			<button
				type="button"
				className="editButton"
				onClick={() => {
					if (!activeProject || project.id !== activeProject.id) {
						toggleSidebar(true);
						updateProject(project);
					} else {
						toggleSidebar(false);
						updateProject(newProjectSummary());
					}
				}}
			>
				<Icon iconKey="edit" />
			</button>
			<Link href={`project/`}>{project.name}</Link>
		</>
	);
}
