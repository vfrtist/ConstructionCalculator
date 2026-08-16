import { ManagerContext } from "@/app/manager/ManagerEditor";
import { ProjectSummary } from "@/lib/structures";
import { deleteProject } from "@/services/projectServices";
import { useContext } from "react";

interface ManagerSidebarProps {
	summary: ProjectSummary;
}

export default function ManagerSidebar({ summary }: ManagerSidebarProps) {
	const { isOpen, updateProject } = useContext(ManagerContext);

	return (
		<aside id="ManagerSidebar" className={`right ${isOpen && "open"}`}>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				value={`${summary && summary.name}`}
				onChange={(e) => {
					updateProject({ ...summary, name: e.target.value });
				}}
			/>
			<label htmlFor="description">Description</label>
			<input
				type="text"
				name="description"
				id="description"
				value={`${summary && summary.description}`}
				onChange={(e) => {
					updateProject({ ...summary, description: e.target.value });
				}}
			/>
			<div>{summary && summary.updatedAt}</div>
			<button type="button" id="copyProject">
				Copy Project
			</button>
			<button
				type="button"
				id="deleteProject"
				onClick={() => {
					deleteProject(summary.id);
				}}
			>
				Delete Project
			</button>
		</aside>
	);
}
