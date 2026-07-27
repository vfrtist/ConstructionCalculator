"use client";

import Card from "@/UI/Generic/Card";
import ThemeButton from "@/UI/Generic/ThemeButton";
import { useState, SetStateAction } from "react";
import { Project, ProjectBoards } from "@/lib/structures";
import { newProjectBoards } from "@/lib/objects";
import { updateProject } from "@/Services/projectServices";
import { useAutoSave } from "@/Hooks/autosave";

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
		setProject((prev) => ({
			...prev,
			boards:
				typeof updater === "function" ? updater(prev.data) : updater,
		}));
	}

	return (
		<>
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
		</>
	);
}
