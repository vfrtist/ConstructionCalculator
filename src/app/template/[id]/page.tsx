import { createProject } from "@/services/projectServices";
import { fetchTemplate } from "@/services/templateServices";
import { fetchCurrentUser } from "@/services/serverServices";
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

	const projectID = await createProject(user.id, template);

	if (!projectID) {
		notFound();
	}

	redirect(`/project/${projectID}`);
}
