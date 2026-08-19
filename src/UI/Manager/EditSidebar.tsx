import { ManagerContext } from "@/ui/Manager/ManagerEditor";
import {
	deleteProject,
	updateProjectSummary,
} from "@/services/projectServices";
import { useContext } from "react";
import { useDebounce } from "@/hooks/debounce";

export default function EditSidebar() {
	const { selector, updateSelector, updateSummary } =
		useContext(ManagerContext);
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
					updateSummary({
						...selector.summary,
						name: e.target.value,
					});
				}}
			/>
			<label htmlFor="description">Description</label>
			<input
				type="text"
				name="description"
				id="description"
				value={`${description}`}
				onChange={(e) => {
					updateSummary({
						...selector.summary,
						description: e.target.value,
					});
				}}
			/>
			<div>
				Last updated:
				{/* {new Date(updatedAt).toLocaleString([], {
					dateStyle: "medium",
					timeStyle: "short",
				})} */}
			</div>
			<button
				type="button"
				id="copyProject"
				onClick={() => {
					updateSelector((prev) => ({
						...prev,
						sidebar: "new",
						summaryType: "project",
					}));
				}}
			>
				Copy Project
			</button>
			<button
				type="button"
				id="deleteProject"
				onClick={() => {
					deleteProject(selector.summary.id);
				}}
			>
				Delete Project
			</button>
		</>
	);
}
