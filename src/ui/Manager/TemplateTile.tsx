import { ManagerContext } from "@/ui/Manager/ManagerEditor";
import { ProjectSummary } from "@/lib/structures";
import { useContext } from "react";

export default function TemplateTile(summary: ProjectSummary) {
	const { updateSelector } = useContext(ManagerContext);

	return (
		<button
			type="button"
			className="TemplateTile"
			onClick={() => {
				updateSelector({
					sidebar: "new",
					summary: summary,
				});
			}}
		>
			{summary.name}
		</button>
	);
}
