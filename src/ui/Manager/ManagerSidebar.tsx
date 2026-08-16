import { ProjectSummary } from "@/lib/structures";

interface ManagerSidebarProps {
	summary: ProjectSummary;
}

export default function ManagerSidebar({ summary }: ManagerSidebarProps) {
	return (
		<aside id="ManagerSidebar">
			<input type="text" name="name" id="name" value={summary.name} />
			<input
				type="text"
				name="description"
				id="description"
				value={summary.description}
			/>
			<div>{summary.updatedAt}</div>
			<button type="button" id="deleteProject">
				Delete Project
			</button>
			<button type="button" id="copyProject">
				Copy Project
			</button>
		</aside>
	);
}
