import { ProjectSummary } from "@/lib/structures";

export default function TemplateTile(project: ProjectSummary) {
	return (
		<button type="button" className="TemplateTile" onClick={() => {}}>
			{project.name}
		</button>
	);
}
