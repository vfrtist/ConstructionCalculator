"use client";

import { ProjectSummary } from "@/lib/structures";
import FileTile from "./FileTile";

export interface FileGroupProps {
	title: string;
	files: ProjectSummary[];
}

export default function FileGroup({ title, files }: FileGroupProps) {
	return (
		<section className="FileGroup container vertical">
			<h2 className="FileGroupTitle">{title}</h2>
			<ul className="FileList container horizontal">
				{files.map((summary) => (
					<FileTile key={summary.id} summary={summary} />
				))}
			</ul>
		</section>
	);
}
