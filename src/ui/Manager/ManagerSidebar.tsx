import { useContext } from "react";
import NewFileSidebar from "./NewFileSidebar";
import EditSidebar from "./EditSidebar";
import { ManagerContext } from "@/app/manager/ManagerEditor";
import Icon from "@/app/ui/Generic/Icon";

export type SideBarType = "new" | "edit" | "hidden";

export default function ManagerSidebar() {
	const { selector, unselect, updateSelector } = useContext(ManagerContext);
	const bar = selector.sidebar;

	return (
		<aside
			className={`Sidebar right${bar !== "hidden" ? " open" : ""}`}
		>
			<button type="button" id="cancel" onClick={() => {
				updateSelector(unselect);
			}}>
				<Icon iconKey="undo" />
			</button>
			{bar === "new" && <NewFileSidebar />}
			{bar === "edit" && <EditSidebar />}
		</aside>
	);
}
