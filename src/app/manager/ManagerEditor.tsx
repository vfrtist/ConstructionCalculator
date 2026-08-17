"use client";

import { useState, createContext } from "react";
import { ProjectSummary } from "@/lib/structures";
import FileGroup from "@/ui/Manager/FileGroup";
import ManagerSidebar from "@/ui/Manager/ManagerSidebar";
import Header from "@/ui/Generic/Header";
import "@/styles/Manager.css";
import { newProjectSummary } from "@/lib/objects";
import { useDebounce } from "@/hooks/debounce";
import { updateProjectSummary } from "@/services/projectServices";

export interface MangerEditorProps {
	recents: ProjectSummary[];
	templates: ProjectSummary[];
}

interface ManagerData {
	isOpen: boolean;
	activeProject: ProjectSummary;
	toggleSidebar: (state: boolean) => void;
	updateProject: (summary: ProjectSummary) => void;
}

export const ManagerContext = createContext<ManagerData>({
	isOpen: false,
	toggleSidebar: () => {},
	activeProject: newProjectSummary(),
	updateProject: () => {},
});

export default function ManagerEditor({
	recents,
	templates,
}: MangerEditorProps) {
	const [sideOpen, setSideOpen] = useState(false);
	const [activeProject, setActiveProject] =
		useState<ProjectSummary>(newProjectSummary());

	useDebounce(activeProject, updateProjectSummary, 2000);

	console.log("recents", recents);
	console.log("templates", templates);

	return (
		<ManagerContext.Provider
			value={{
				isOpen: sideOpen,
				activeProject: activeProject,
				toggleSidebar: (state) => {
					setSideOpen(state);
				},
				updateProject: (summary) => {
					setActiveProject(summary);
				},
			}}
		>
			<main className="Manager">
				<Header />
				<div className="left">
					<FileGroup
						title={"Recent"}
						files={recents}
						type={"project"}
					/>
					<FileGroup
						title={"New"}
						files={templates}
						type={"template"}
					/>
				</div>
				<ManagerSidebar summary={activeProject} />
			</main>
		</ManagerContext.Provider>
	);
}
