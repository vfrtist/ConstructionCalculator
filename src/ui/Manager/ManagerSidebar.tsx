import { useContext } from "react";
import NewFileSidebar from "./NewFileSidebar";
import EditSidebar from "./EditSidebar";
import { ManagerContext, unselect } from "@/ui/Manager/ManagerEditor";
import Icon from "@/ui/Generic/Icon";
import "@/styles/ManagerSidebar.css";

export type SideBarType = "new" | "edit" | "hidden";

export default function ManagerSidebar() {
	const { selector, updateSelector } = useContext(ManagerContext);
	const bar = selector.sidebar;

	return (
		<aside className={`Sidebar right${bar !== "hidden" ? " open" : ""}`}>
			<div className="delayWrapper">
				<button
					type="button"
					id="cancel"
					onClick={() => {
						updateSelector(unselect);
					}}
				>
					<Icon iconKey="redo" />
				</button>
				{bar === "new" && <NewFileSidebar key={selector.summary.id} />}
				{bar === "edit" && <EditSidebar />}
			</div>
		</aside>
	);
}
