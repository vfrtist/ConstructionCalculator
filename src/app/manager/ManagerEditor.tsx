"use client";

import { useState, createContext, Dispatch, SetStateAction } from "react";
import { ProjectSummary } from "@/lib/structures";
import Header from "@/ui/Generic/Header";
import "@/styles/Manager.css";
import ManagerSidebar, { SideBarType } from "@/ui/Manager/ManagerSidebar";
import FileGroup from "@/ui/Manager/FileGroup";
import { newProjectSummary } from "@/lib/objects";

interface MangerEditorProps {
	recents: ProjectSummary[];
	templates: ProjectSummary[];
}

export interface ManagerSelector {
	sidebar: SideBarType;
	summary: ProjectSummary;
}

interface ManagerData {
	selector: ManagerSelector;
	updateSelector: Dispatch<SetStateAction<ManagerSelector>>;
	updateSummary: Dispatch<SetStateAction<ProjectSummary[]>>;
}

export const ManagerContext = createContext<ManagerData>({
	selector: { sidebar: "hidden", summary: newProjectSummary() },
	updateSelector: () => {},
	updateSummary: () => {},
});

export default function ManagerEditor({
	recents,
	templates,
}: MangerEditorProps) {
	const [recentFiles, setRecentFiles] = useState(recents);
	const [selection, setSelection] = useState<ManagerSelector>({
		sidebar: "hidden",
		summary: newProjectSummary(),
	});

	return (
		<ManagerContext.Provider
			value={{
				selector: selection,
				updateSelector: setSelection,
				updateSummary: setRecentFiles,
			}}
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
		</ManagerContext.Provider>
	);
}
