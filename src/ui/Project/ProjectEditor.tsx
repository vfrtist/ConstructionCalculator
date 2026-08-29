"use client";

import Card from "@/ui/Project/Card";
import { useState, createContext, useEffect } from "react";
import { BoardData, Project, ProjectBoards } from "@/lib/structures";
import { newProjectBoards } from "@/lib/objects";
import { updateProject } from "@/services/projectServices";
import { useDebounce } from "@/hooks/debounce";
import Carousel from "@/ui/Generic/Carousel";
import Header from "@/ui/Generic/Header";
import Icon from "@/ui/Generic/Icon";
import Link from "next/link";
import { fetchCurrentUserID } from "@/services/serverServices";
import { fetchCurrentUserRole } from "@/services/userServices";

interface ProjectEditorProps {
	initialProject: Project;
}

export interface ProjectData {
	boards: ProjectBoards;
	setBoards: (id: string, data: BoardData) => void;
	addBoard: () => void;
	deleteBoard: (id: string) => void;
}

export const ProjectContext = createContext<ProjectData>({
	boards: {},
	setBoards: () => {},
	addBoard: () => {},
	deleteBoard: () => {},
});

export default function ProjectEditor({ initialProject }: ProjectEditorProps) {
	const [boards, setBoards] = useState<ProjectBoards>(initialProject.data);

	useEffect(() => {
		async function UserCheck() {
			return await fetchCurrentUserRole(initialProject.id);
		}
		const role = UserCheck();

		// if (role && role !== "viewer") {

		// }
	}, [initialProject]);
	useDebounce(
		boards,
		async (data) => {
			await updateProject({ ...initialProject, data: data });
		},
		2000,
	);

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
					boards: boards,
					setBoards: (id: string, data: BoardData) => {
						setBoards((prev) => ({ ...prev, [id]: data }));
					},
					addBoard: () => {
						setBoards((prev) => ({
							...prev,
							...newProjectBoards(),
						}));
					},
					deleteBoard: (id: string) => {
						setBoards((prev) => {
							const {
								[id]: {},
								...rest
							} = prev;
							return rest;
						});
					},
				}}
			>
				<Carousel>
					{Object.entries(boards).map(([id]) => (
						<Card key={id} id={id} />
					))}
				</Carousel>
			</ProjectContext.Provider>
		</main>
	);
}
