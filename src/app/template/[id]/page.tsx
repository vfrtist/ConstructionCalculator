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
	const now = new Date().toISOString();

	if (!template) {
		notFound();
	}
	if (!user) {
		redirect("/login/");
	}
	const project = await createProject(user.id, "Untitled Project", {
		...template,
		updatedAt: now,
	});

	if (!project) {
		notFound();
	}

	redirect(`/project/${project.id}`);
}
