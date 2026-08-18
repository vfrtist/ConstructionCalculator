import { ManagerContext } from "@/app/manager/ManagerEditor";
import { ProjectSummary } from "@/lib/structures";
import { useContext } from "react";

export default function TemplateTile(project: ProjectSummary) {
	const { updateSidebar, updateSelected } = useContext(ManagerContext);
	return (
		<button
			type="button"
			className="TemplateTile"
			onClick={() => {
				updateSelected(project);
				updateSidebar("new");
			}}
		>
			{project.name}
		</button>
	);
}
