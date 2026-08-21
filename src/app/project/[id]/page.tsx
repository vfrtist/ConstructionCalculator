import { fetchProject } from "@/services/projectServices";
import ProjectEditor from "../../../ui/Project/ProjectEditor";
import { notFound } from "next/navigation";
import "@/styles/Project.css";

interface ProjectPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { id } = await params;
	const project = await fetchProject(id);

	if (!project) {
		notFound();
	}
	return <ProjectEditor initialProject={project} />;
}
