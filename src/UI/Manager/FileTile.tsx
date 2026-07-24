import { ProjectSummary, ProjectType } from "@/lib/structures";
import Link from "next/link";

export interface FileTileProps {
	project: ProjectSummary;
	type: ProjectType;
}

export default function FileTile({ project, type }: FileTileProps) {
	return (
		<li className="FileTile">
			<Link
				href={
					type === "project"
						? `project/${project.id}`
						: `template/${project.id}`
				}
			>
				<div>{project.name}</div>
			</Link>
		</li>
	);
}
