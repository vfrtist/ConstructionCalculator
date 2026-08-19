import { useContext } from "react";
import { ProjectSummary, ProjectType } from "@/lib/structures";
import { ManagerContext } from "@/ui/Manager/ManagerEditor";
import ProjectTile from "@/ui/Manager/ProjectTile";
import TemplateTile from "@/ui/Manager/TemplateTile";

export interface FileTileProps {
	summary: ProjectSummary;
	type: ProjectType;
}

export default function FileTile({ summary, type }: FileTileProps) {
	const { selector } = useContext(ManagerContext);

	return (
		<li
			className={`FileTile${selector.summary.id === summary.id ? " selected" : ""}`}
		>
			{type === "project" ? (
				<ProjectTile {...summary} />
			) : (
				<TemplateTile {...summary} />
			)}
		</li>
	);
}
