import { useContext } from "react";
import { isUserSummary, ProjectSummary } from "@/lib/structures";
import { ManagerContext } from "@/ui/Manager/ManagerEditor";
import ProjectTile from "@/ui/Manager/ProjectTile";
import TemplateTile from "@/ui/Manager/TemplateTile";

export interface FileTileProps {
	summary: ProjectSummary;
}

export default function FileTile({ summary }: FileTileProps) {
	const { selector } = useContext(ManagerContext);

	return (
		<li
			className={`FileTile${selector.summary.id === summary.id ? " selected" : ""}`}
		>
			{isUserSummary(summary) ? (
				<ProjectTile {...summary} />
			) : (
				<TemplateTile {...summary} />
			)}
		</li>
	);
}
