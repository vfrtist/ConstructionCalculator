import { ManagerContext } from "@/app/manager/ManagerEditor";
import { ProjectSummary } from "@/lib/structures";
import {
	createProject,
	deleteProject,
	fetchProject,
} from "@/services/projectServices";
import { useContext } from "react";
import { fetchCurrentUser } from "@/services/serverServices";
import { redirect } from "next/navigation";

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
			<div>
				Last updated:
				{summary &&
					new Date(summary.updatedAt).toLocaleString([], {
						dateStyle: "medium",
						timeStyle: "short",
					})}
			</div>
			<button
				type="button"
				id="copyProject"
				onClick={async () => {
					const user = await fetchCurrentUser();
					if (!user) {
						console.log("no user");
						return;
					}
					const copyProject = await fetchProject(summary.id);

					if (!copyProject) {
						console.log("no project");
						return;
					}
					const projectID = await createProject(
						user.id,
						copyProject,
						copyProject.name,
					);

					redirect(`/project/${projectID}`);
				}}
			>
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
