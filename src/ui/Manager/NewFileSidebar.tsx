import { Project } from "@/lib/structures";
import { useState, useContext } from "react";
import { createProject } from "@/services/projectServices";

export default function NewFileSidebar() {
	const [newProject, setNewProject] = useState<Project>();

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		await createProject(newProject);
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				value={`${newProject.name}`}
				onChange={(e) => {
					setNewProject((prev) => ({
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
				value={`${newProject.description}`}
				onChange={(e) => {
					setNewProject((prev) => ({
						...prev,
						description: e.target.value,
					}));
				}}
			/>
			<button type="submit">Create</button>
		</form>
	);
}
