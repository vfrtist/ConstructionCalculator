"use client";

import { useState, createContext } from "react";
import { ProjectSummary } from "@/lib/structures";
import FileGroup from "@/ui/Manager/FileGroup";
import ManagerSidebar from "@/ui/Manager/ManagerSidebar";
import Header from "@/ui/Generic/Header";
import "@/styles/Manager.css";
import { newProjectSummary } from "@/lib/objects";

export interface MangerEditorProps {
	recents: ProjectSummary[];
	templates: ProjectSummary[];
}

interface ManagerData {
	isOpen: boolean;
	activeProject: ProjectSummary | null;
	toggleSidebar: (state: boolean) => void;
	updateProject: (summary: ProjectSummary | null) => void;
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
	const [activeProject, setActiveProject] = useState<ProjectSummary | null>(
		null,
	);

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
