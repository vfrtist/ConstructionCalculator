import { useContext } from "react";
import NewFileSidebar from "./NewFileSidebar";
import EditSidebar from "./EditSidebar";
import { ManagerContext } from "@/app/manager/ManagerEditor";
import { newProject } from "@/lib/objects";

export type SideBarType = "new" | "edit" | "hidden";

export default function ManagerSidebar() {
	const { sidebar } = useContext(ManagerContext);

	const SidebarMap: Record<SideBarType, React.ReactNode> = {
		new: <NewFileSidebar initialProject={newProject()} />,
		edit: <EditSidebar />,
		hidden: <></>,
	};

	return (
		<aside
			className={`Sidebar right${sidebar !== "hidden" ? " open" : ""}`}
		>
			{SidebarMap[sidebar]}
		</aside>
	);
}
