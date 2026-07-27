import { convertToProject } from "@/lib/objects";
import { createProject } from "@/Services/projectServices";
import { fetchTemplate } from "@/Services/templateServices";
import { fetchCurrentUser } from "@/Services/serverServices";
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

	const project = convertToProject(template);
	console.log(project);

	const projectID = await createProject(user.id, project);

	if (!projectID) {
		notFound();
	}

	redirect(`/project/${projectID}`);
}
