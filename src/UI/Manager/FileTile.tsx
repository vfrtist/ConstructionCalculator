import { useContext } from "react";
import { ProjectSummary, ProjectType } from "@/lib/structures";
import { ManagerContext } from "@/app/manager/ManagerEditor";
import ProjectTile from "./ProjectTile";
import TemplateTile from "./TemplateTile";

export interface FileTileProps {
	project: ProjectSummary;
	type: ProjectType;
}

export default function FileTile({ project, type }: FileTileProps) {
	const { activeProject } = useContext(ManagerContext);

	return (
		<li
			className={`FileTile${project.id === activeProject.id ? " selected" : ""}`}
		>
			{type === "project" ? (
				<ProjectTile {...project} />
			) : (
				<TemplateTile {...project} />
			)}
		</li>
	);
}
