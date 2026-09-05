"use client";

import { useState, createContext, Dispatch, SetStateAction } from "react";
import { ProjectSummary, UserSummary } from "@/lib/structures";
import Header from "@/ui/Generic/Header";
import "@/styles/Manager.css";
import ManagerSidebar, { SideBarType } from "@/ui/Manager/ManagerSidebar";
import FileGroup from "@/ui/Manager/FileGroup";
import { newProjectSummary } from "@/lib/objects";
import { signOut } from "@/services/browserServices";
import { redirect } from "next/navigation";

interface MangerEditorProps {
	recents: UserSummary[];
	templates: ProjectSummary[];
}

export interface ManagerSelector {
	sidebar: SideBarType;
	summary: ProjectSummary;
}

interface ManagerData {
	selector: ManagerSelector;
	updateSelector: Dispatch<SetStateAction<ManagerSelector>>;
	updateSummary: (summary: ProjectSummary) => void;
	deleteFile: (id: string) => void;
}

export const unselect: ManagerSelector = {
	sidebar: "hidden",
	summary: newProjectSummary(),
};

export const ManagerContext = createContext<ManagerData>({
	selector: { ...unselect },
	updateSelector: () => {},
	updateSummary: () => {},
	deleteFile: () => {},
});

export default function ManagerEditor({
	recents,
	templates,
}: MangerEditorProps) {
	const [recentFiles, setRecentFiles] = useState<ProjectSummary[]>(recents);
	const [selection, setSelection] = useState<ManagerSelector>(unselect);

	function deleteFile(id: string) {
		setRecentFiles((prev) => prev.filter((sum) => sum.id !== id));
	}

	return (
		<ManagerContext.Provider
			value={{
				selector: selection,
				updateSelector: setSelection,
				updateSummary: (summary: ProjectSummary) => {
					setSelection((prev) => ({ ...prev, summary: summary }));
					setRecentFiles((prev) =>
						prev.map((sum) =>
							sum.id === summary.id ? summary : sum,
						),
					);
				},
				deleteFile: deleteFile,
			}}
		>
			<main className="Manager">
				<Header
				// rightElements={
				// 	<button
				// 		onClick={() => {
				// 			signOut();
				// 			redirect("/login");
				// 		}}
				// 	>
				// 		Sign Out
				// 	</button>
				// }
				/>
				<div className="left">
					{recentFiles && recentFiles.length > 0 && (
						<FileGroup title={"Recent"} files={recentFiles} />
					)}
					<FileGroup title={"New"} files={templates} />
				</div>
				<ManagerSidebar />
			</main>
		</ManagerContext.Provider>
	);
}
