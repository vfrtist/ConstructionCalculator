import { useContext } from "react";
import { ManagerContext, unselect } from "@/ui/Manager/ManagerEditor";
import { UserSummary } from "@/lib/structures";
import Icon from "@/ui/Generic/Icon";
import Link from "next/link";

export default function ProjectTile(summary: UserSummary) {
	const { updateSelector, selector } = useContext(ManagerContext);

	return (
		<>
			<button
				type="button"
				className="editButton"
				onClick={() => {
					if (selector.summary.id !== summary.id) {
						updateSelector({
							sidebar: "edit",
							summary: summary,
						});
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
