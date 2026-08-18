import { useContext } from "react";
import { ManagerContext } from "@/app/manager/ManagerEditor";
import { ProjectSummary } from "@/lib/structures";
import Icon from "@/ui/Generic/Icon";
import Link from "next/link";

export default function ProjectTile(summary: ProjectSummary) {
	const { updateSelector, selector, unselect } = useContext(ManagerContext);

	return (
		<>
			<button
				type="button"
				className="editButton"
				onClick={() => {
					if (selector.summary.id !== summary.id) {
						updateSelector({ sidebar: "edit", summary: summary, summaryType: "project" });
					} else {
						updateSelector(unselect);
					}
				}}
			>
				<Icon iconKey="edit" />
			</button>
			<Link href={`project/${summary.id}`}>{summary.name}</Link>
		</>
	);
}
