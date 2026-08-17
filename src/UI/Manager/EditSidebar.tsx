import { ManagerContext } from "@/app/manager/ManagerEditor";
import {
	createProject,
	deleteProject,
	fetchProject,
	updateProjectSummary,
} from "@/services/projectServices";
import { useContext } from "react";
import { fetchCurrentUser } from "@/services/serverServices";
import { redirect } from "next/navigation";
import { useDebounce } from "@/hooks/debounce";

export default function EditSidebar() {
	const { updateSummary, activeProject } = useContext(ManagerContext);

	useDebounce(activeProject, updateProjectSummary, 2000);

	return (
		<>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				value={`${activeProject?.name ?? ""}`}
				onChange={(e) => {
					if (!activeProject) return;
					updateSummary({ ...activeProject, name: e.target.value });
				}}
			/>a
			<label htmlFor="description">Description</label>
			<input
				type="text"
				name="description"
				id="description"
				value={`${activeProject?.description ?? ""}`}
				onChange={(e) => {
					if (!activeProject) return;
					updateSummary({ ...activeProject, description: e.target.value });
				}}
			/>
			<div>
				Last updated:
				{activeProject &&
					new Date(activeProject.updatedAt).toLocaleString([], {
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
					const copyProject = await fetchProject(activeProject.id);

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
					deleteProject(activeProject.id);
				}}
			>
				Delete Project
			</button>
		</>
	);
}
