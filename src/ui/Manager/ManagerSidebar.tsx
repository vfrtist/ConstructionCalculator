import { useContext } from "react";
import NewFileSidebar from "./NewFileSidebar";
import EditSidebar from "./EditSidebar";
import { ManagerContext } from "@/app/manager/ManagerEditor";

export type SideBarType = "new" | "edit" | "hidden";

export default function ManagerSidebar() {
	const { selector } = useContext(ManagerContext);
	const bar = selector.sidebar;

	return (
		<aside
			className={`Sidebar right${bar !== "hidden" ? " open" : ""}`}
		>
			{bar === "new" && <NewFileSidebar />}
			{bar === "edit" && <EditSidebar />}
		</aside>
	);
}
