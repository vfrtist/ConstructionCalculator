import { loadProject } from "@/Services/projectServices";
import ProjectEditor from "./ProjectEditor";
import { notFound } from "next/navigation";

interface ProjectPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { id } = await params;
	const project = await loadProject(id); // The sticking point

	if (!project) {
		notFound();
	}

	return <ProjectEditor project={project} />;
}
