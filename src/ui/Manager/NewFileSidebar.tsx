import { useContext, useState } from "react";
import { createProject, fetchProject } from "@/services/projectServices";
import { ManagerContext } from "@/ui/Manager/ManagerEditor";
import { fetchTemplate } from "@/services/templateServices";
import { redirect } from "next/navigation";

export default function NewFileSidebar() {
	const { selector } = useContext(ManagerContext);
	const [newSummary, setNewSummary] = useState(selector.summary);

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const copyProject =
			selector.summaryType === "project"
				? await fetchProject(newSummary.id)
				: await fetchTemplate(newSummary.id);

		const id = await createProject({ ...copyProject, ...newSummary });
		if (id) {
			redirect(`project/${id}`);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="container vertical">
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				value={`${newSummary.name}`}
				onChange={(e) => {
					setNewSummary((prev) => ({
						...prev,
						name: e.target.value,
					}));
				}}
			/>
			<label htmlFor="description">Description</label>
			<input
				type="text"
				name="description"
				id="description"
				value={`${newSummary.description}`}
				onChange={(e) => {
					setNewSummary((prev) => ({
						...prev,
						description: e.target.value,
					}));
				}}
			/>
			<button type="submit">Create</button>
		</form>
	);
}
