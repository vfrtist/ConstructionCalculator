"use client";

import Card from "@/ui/Project/Card";
import ThemeButton from "@/ui/Generic/ThemeButton";
import { useState, SetStateAction } from "react";
import { Project, ProjectBoards } from "@/lib/structures";
import { newProjectBoards } from "@/lib/objects";
import { updateProject } from "@/services/projectServices";
import { useAutoSave } from "@/hooks/autosave";
import Header from "@/ui/Generic/Header";

interface ProjectEditorProps {
	initialProject: Project;
}

export default function ProjectEditor({ initialProject }: ProjectEditorProps) {
	const [project, setProject] = useState<Project>(initialProject);
	useAutoSave(project, updateProject);

	function addBoard() {
		setProject((prev) => {
			return {
				...prev,
				data: { ...prev.data, ...newProjectBoards() },
			};
		});
	}

	function setProjectData(updater: SetStateAction<ProjectBoards>) {
		console.log("updating project");
		setProject((prev) => ({
			...prev,
			data: typeof updater === "function" ? updater(prev.data) : updater,
		}));
	}

	return (
		<main>
			<Header title={project.name} />
			{Object.entries(project.data).map(([id, card]) => (
				<Card
					key={id}
					id={id}
					data={card}
					setProjectData={setProjectData}
				/>
			))}
			<ThemeButton type="button" className="add" onClick={addBoard}>
				+
			</ThemeButton>
		</main>
	);
}
