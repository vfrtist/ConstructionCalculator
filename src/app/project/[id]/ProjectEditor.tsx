"use client";

import Card from "@/ui/Project/Card";
import { useState, createContext } from "react";
import { BoardData, Project, ProjectBoards } from "@/lib/structures";
import { newProjectBoards } from "@/lib/objects";
import { updateProject } from "@/services/projectServices";
import { useDebounce } from "@/hooks/debounce";
import Carousel from "@/ui/Generic/Carousel";
import Header from "@/ui/Generic/Header";
import Icon from "@/ui/Generic/Icon";
import Link from "next/link";

interface ProjectEditorProps {
	initialProject: Project;
}

export interface ProjectData {
	data: ProjectBoards;
	setProjectData: (id: string, data: BoardData) => void;
	addBoard: () => void;
}

export const ProjectContext = createContext<ProjectData>({
	data: {},
	setProjectData: () => {},
	addBoard: () => {},
});

export default function ProjectEditor({ initialProject }: ProjectEditorProps) {
	const [project, setProject] = useState<Project>(initialProject);
	useDebounce(project, updateProject, 2000);

	return (
		<main>
			<Header
				leftElements={
					<Link key="manager" href={"/manager"}>
						<Icon iconKey="undo" />
					</Link>
				}
			/>
			<ProjectContext.Provider
				value={{
					data: project.data,
					setProjectData: (id: string, data: BoardData) => {
						setProject((prev) => ({
							...prev,
							data: { ...prev.data, [id]: data },
						}));
					},
					addBoard: () => {
						setProject((prev) => ({
							...prev,
							data: { ...prev.data, ...newProjectBoards() },
						}));
					},
				}}
			>
				<Carousel>
					{Object.entries(project.data).map(([id]) => (
						<Card key={id} id={id} />
					))}
				</Carousel>
			</ProjectContext.Provider>
		</main>
	);
}
