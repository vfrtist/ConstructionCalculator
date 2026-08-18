import { useContext } from "react";
import { ManagerContext } from "@/app/manager/ManagerEditor";
import { ProjectSummary } from "@/lib/structures";
import { newProjectSummary } from "@/lib/objects";
import Icon from "@/ui/Generic/Icon";
import Link from "next/link";

export default function ProjectTile(summary: ProjectSummary) {
	const { updateSelector, selector } = useContext(ManagerContext);

	return (
		<>
			<button
				type="button"
				className="editButton"
				onClick={() => {
					if (selector.summary.id !== summary.id) {
						updateSelector({ sidebar: "edit", summary: summary });
					} else {
						updateSelector({
							sidebar: "hidden",
							summary: newProjectSummary(),
						});
					}
				}}
			>
				<Icon iconKey="edit" />
			</button>
			<Link href={`project/`}>{summary.name}</Link>
		</>
	);
}
