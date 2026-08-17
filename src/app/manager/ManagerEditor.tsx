"use client";

import { useState, createContext } from "react";
import { ProjectSummary } from "@/lib/structures";
import FileGroup from "@/ui/manager/FileGroup";
import Header from "@/ui/Generic/Header";
import "@/styles/Manager.css";
import ManagerSidebar, { SideBarType } from "@/ui/manager/ManagerSidebar";

export interface MangerEditorProps {
	recents: ProjectSummary[];
	templates: ProjectSummary[];
}

interface ManagerData {
	recents: ProjectSummary[];
	selectedFile: ProjectSummary | null;
	sidebar: SideBarType;
	updateSidebar: (state: SideBarType) => void;
	updateSummary: (summary: ProjectSummary) => void;
	updateSelected: () => void;
}

export const ManagerContext = createContext<ManagerData>({
	recents: [],
	selectedFile: null,
	sidebar: "hidden",
	updateSidebar: () => { },
	updateSummary: () => { },
});

export default function ManagerEditor({
	recents,
	templates,
}: MangerEditorProps) {
	const [recentFiles, setRecentFiles] = useState(recents);
	const [selectedFile, setSelected] = useState(null);
	const [sidebarState, setSidebarState] = useState<SideBarType>("hidden");

	return (
		<ManagerContext.Provider
			value={{
				recents: recentfiles,
				selectedFile: selectedFile,
				sidebar: sidebarState,
				updateSidebar: (state) => {
					setSidebarState(state);
				},
				updateSummary: (summary) => {
					setFiles((prev) => (
						prev.map((s) => (
							s.id === summary.id ? summary : s
						))))
				}
			}
			}
		>
			<main className="Manager">
				<Header />
				<div className="left">
					<FileGroup
						title={"Recent"}
						files={recentFiles}
						type={"project"}
					/>
					<FileGroup
						title={"New"}
						files={templates}
						type={"template"}
					/>
				</div>
				<ManagerSidebar />
			</main>
		</ ManagerContext.Provider >
	);
}
