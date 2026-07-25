import { ProjectSummary } from "@/lib/structures";
import { sql } from "./db";
import { BlankTemplate } from "@/Data/TestData";

export async function fetchAllTemplates() {
	try {
		const templates = await sql<ProjectSummary[]>`
		SELECT
			t.id,
			t.name,
			t.updated_at,
			t.description
		FROM Templates;`;
		return templates;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to get all templates.");
	}
}

export async function fetchTemplate(templateID: string) {
	const templates = [BlankTemplate];
	const template = templates.find((t) => t.id === templateID);
	return template ?? null;
}
