import { useContext } from "react";
import Link from "next/link";
import { ProjectSummary, ProjectType } from "@/lib/structures";
import Icon from "@/ui/Generic/Icon";
import { ManagerContext } from "@/app/manager/ManagerEditor";
import { newProjectSummary } from "@/lib/objects";

export interface FileTileProps {
	project: ProjectSummary;
	type: ProjectType;
}

export default function FileTile({ project, type }: FileTileProps) {
	const { toggleSidebar, activeProject, updateProject } =
		useContext(ManagerContext);

	return (
		<li
			className={`FileTile${activeProject && project.id === activeProject.id ? " selected" : ""}`}
		>
			{type === "project" ? (
				<>
					<button
						type="button"
						className="editButton"
						onClick={() => {
							if (
								!activeProject ||
								project.id !== activeProject.id
							) {
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
					<Link href={`manager/`}>{project.name}</Link>
				</>
			) : (
				<Link href={`template/${project.id}`}>{project.name}</Link>
			)}
		</li>
	);
}
