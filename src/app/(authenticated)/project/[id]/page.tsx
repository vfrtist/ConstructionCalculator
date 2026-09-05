import { fetchProject } from "@/services/projectServices";
import ProjectEditor from "../../../../ui/Project/ProjectEditor";
import { notFound } from "next/navigation";
import "@/styles/Project.css";
import {
	createProjectUser,
	fetchCurrentUserRole,
} from "@/services/userServices";

interface ProjectPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { id } = await params;

	// get project and role data
	const [project, role] = await Promise.all([
		fetchProject(id),
		fetchCurrentUserRole(id),
	]);

	if (!project) notFound();

	if (!role) createProjectUser(id, "editor");

	return <ProjectEditor initialProject={project} role={role ?? "viewer"} />;
}
