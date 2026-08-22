import { ManagerContext } from "@/ui/Manager/ManagerEditor";
import {
	deleteProject,
	updateProjectSummary,
} from "@/services/projectServices";
import { useContext } from "react";
import { useDebounce } from "@/hooks/debounce";

export default function EditSidebar() {
	const { selector, updateSelector, updateSummary, deleteFile, unselect } =
		useContext(ManagerContext);
	const { name, description } = selector.summary;
	useDebounce(selector.summary, updateProjectSummary, 2000);

	return (
		<div className="container vertical content">
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
				onClick={async () => {
					if (await deleteProject(selector.summary.id)) {
						deleteFile(selector.summary.id);
						updateSelector(unselect);
					}
				}}
			>
				Delete Project
			</button>
		</div>
	);
}
