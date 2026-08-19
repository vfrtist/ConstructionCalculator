"use client";

import { useState, createContext, Dispatch, SetStateAction } from "react";
import { ProjectSummary, ProjectType } from "@/lib/structures";
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
	summaryType: ProjectType;
}

interface ManagerData {
	selector: ManagerSelector;
	unselect: ManagerSelector;
	updateSelector: Dispatch<SetStateAction<ManagerSelector>>;
	updateSummary: (summary: ProjectSummary) => void;
}

export const ManagerContext = createContext<ManagerData>({
	selector: {
		sidebar: "hidden",
		summary: newProjectSummary(),
		summaryType: "project",
	},
	unselect: {
		sidebar: "hidden",
		summary: newProjectSummary(),
		summaryType: "project",
	},
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
		summaryType: "project",
	});

	return (
		<ManagerContext.Provider
			value={{
				selector: selection,
				unselect: {
					sidebar: "hidden",
					summary: newProjectSummary(),
					summaryType: "project",
				},
				updateSelector: setSelection,
				updateSummary: (summary: ProjectSummary) => {
					setSelection((prev) => ({ ...prev, summary: summary }));
					setRecentFiles((prev) =>
						prev.map((sum) =>
							sum.id === summary.id ? summary : sum,
						),
					);
				},
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
