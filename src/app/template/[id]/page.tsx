import { convertToProject } from "@/lib/objects";
import { createProject } from "@/Services/projectServices";
import { fetchTemplate } from "@/Services/templateServices";
import { fetchCurrentUser } from "@/Services/userServices";
import { redirect, notFound } from "next/navigation";

interface TemplatePageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function TemplatePage({ params }: TemplatePageProps) {
	const { id } = await params;

	const user = await fetchCurrentUser();
	const template = await fetchTemplate(id);

	if (!template) {
		notFound();
	}
	if (!user) {
		redirect("/login/");
	}
	const project = await createProject(user.id, convertToProject(template));

	if (!project) {
		notFound();
	}

	redirect(`/project/${project.id}`);
}
