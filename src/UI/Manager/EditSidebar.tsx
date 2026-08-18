import { ManagerContext } from "@/app/manager/ManagerEditor";
import {
	deleteProject,
	updateProjectSummary,
} from "@/services/projectServices";
import { useContext } from "react";
import { useDebounce } from "@/hooks/debounce";


export default function EditSidebar() {
	const { selector, updateSelector } = useContext(ManagerContext);
	const { name, description, updatedAt } = selector.summary;
	useDebounce(selector.summary, updateProjectSummary, 2000);

	return (
		<>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				value={`${name}`}
				onChange={(e) => {
					updateSummary({ ...selector.summary, name: e.target.value });
				}}
			/>a
			<label htmlFor="description">Description</label>
			<input
				type="text"
				name="description"
				id="description"
				value={`${description}`}
				onChange={(e) => {
					updateSummary({ ...selector.summary, description: e.target.value });
				}}
			/>
			<div>
				Last updated:
				{new Date(updatedAt).toLocaleString([], {
					dateStyle: "medium",
					timeStyle: "short",
				})}
			</div>
			<button
				type="button"
				id="copyProject"
				onClick={() => {
					updateSelector((prev) => ({ ...prev, sidebar: "new", summaryType: "project" }))
					// const user = await fetchCurrentUser();
					// if (!user) {
					// 	console.log("no user");
					// 	return;
					// }
					// const copyProject = await fetchProject(activeProject.id);

					// if (!copyProject) {
					// 	console.log("no project");
					// 	return;
					// }
					// const projectID = await createProject(
					// 	user.id,
					// 	copyProject,
					// 	copyProject.name,
					// );

					// redirect(`/project/${projectID}`);
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
