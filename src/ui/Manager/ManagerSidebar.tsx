import { useContext } from "react";
import NewFileSidebar from "./NewFileSidebar";
import EditSidebar from "./EditSidebar";
import { ManagerContext } from "@/app/manager/ManagerEditor";

export type SideBarType = "new" | "edit" | "hidden"

const SidebarMap: Record<SideBarType, React.ReactNode> = {
    new: <NewFileSidebar />,
    edit: <EditSidebar />
};

export default function ManagerSidebar() {
    const { isOpen, updateProject, activeProject, sidebar } = useContext(ManagerContext);

    return <aside className={`Sidebar right${sidebar !== "hidden" && " open"}`}>
        {SidebarMap[sidebar]}
    </aside>
}