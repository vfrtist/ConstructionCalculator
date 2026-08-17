import { ManagerContext } from "@/app/manager/ManagerEditor";
import { Project } from "@/lib/structures";
import { useState, useContext } from "react";
import { createProject } from "@/services/projectServices";

interface NewFileSidebarProps {
	copyProject: Project;
}

export default function NewFileSidebar({ copyProject }: NewFileSidebarProps) {
	const [newProject, setNewProject] = useState(copyProject);
	const { isOpen } = useContext(ManagerContext);

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		await createProject(newProject);
	}

	return (
		<aside id="NewSidebar" className={`Sidebar right ${isOpen && "open"}`}>
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
		</aside>
	);
}
