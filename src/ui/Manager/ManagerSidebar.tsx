import { ManagerContext } from "@/app/manager/ManagerEditor";
import { ProjectSummary } from "@/lib/structures";
import { useContext } from "react";

interface ManagerSidebarProps {
	summary: ProjectSummary | null;
}

export default function ManagerSidebar({ summary }: ManagerSidebarProps) {
	const { isOpen } = useContext(ManagerContext);

	return (
		<aside id="ManagerSidebar" className={`right ${isOpen && "open"}`}>
			<input
				type="text"
				name="name"
				id="name"
				value={`${summary && summary.name}`}
			/>
			<input
				type="text"
				name="description"
				id="description"
				value={`${summary && summary.description}`}
			/>
			<div>{summary && summary.updatedAt}</div>
			<button type="button" id="copyProject">
				Copy Project
			</button>
			<button type="button" id="deleteProject">
				Delete Project
			</button>
		</aside>
	);
}
