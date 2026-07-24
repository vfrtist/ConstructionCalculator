import { createProject } from "@/Services/projectServices";
import { getCurrentUser } from "@/Services/userServices";
import { redirect, notFound } from "next/navigation";

interface TemplatePageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function TemplatePage({ params }: TemplatePageProps) {
	const { id } = await params;

	const user = await getCurrentUser();

	const project = await createProject(user.id, id, "Untitled Project");

	if (!project) {
		notFound();
	}

	redirect(`/Project/${project.id}`);
}
