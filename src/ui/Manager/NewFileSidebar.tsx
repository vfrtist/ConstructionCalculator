import { Project } from "@/lib/structures";
import { useState } from "react";
import { createProject } from "@/services/projectServices";

interface NewFileProps {
	initialProject: Project;
}

export default function NewFileSidebar({ initialProject }: NewFileProps) {
	const [project, setProject] = useState(initialProject);

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		await createProject(project);
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				value={`${project.name}`}
				onChange={(e) => {
					setProject((prev) => ({ ...prev, name: e.target.value }));
				}}
			/>
			<label htmlFor="description">Description</label>
			<input
				type="text"
				name="description"
				id="description"
				value={`${project.description}`}
				onChange={(e) => {
					setProject((prev) => ({
						...prev,
						description: e.target.value,
					}));
				}}
			/>
			<button type="submit">Create</button>
		</form>
	);
}
