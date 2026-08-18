"use client";

import { ProjectSummary, ProjectType } from "@/lib/structures";
import FileTile from "./FileTile";

export interface FileGroupProps {
	title: string;
	files: ProjectSummary[];
	type: ProjectType;
}

export default function FileGroup({ title, files, type }: FileGroupProps) {
	return (
		<section className="FileGroup container vertical">
			<h2 className="FileGroupTitle">{title}</h2>
			<ul className="FileList container horizontal">
				{files.map((summary) => (
					<FileTile key={summary.id} summary={summary} type={type} />
				))}
			</ul>
		</section>
	);
}
