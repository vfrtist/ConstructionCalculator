import { ProjectSummary, Template } from "@/lib/structures";
import { sql } from "./db";

export async function fetchAllTemplates() {
	try {
		const templates = await sql<ProjectSummary[]>`
		SELECT
			id,
			name,
			description
		FROM templates;`;
		return templates;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to get all templates.");
	}
}

export async function fetchTemplate(templateID: string) {
	try {
		const template = await sql<Template[]>`
		SELECT *
		FROM templates
		WHERE id = ${templateID}
		`;
		return template[0];
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to find matching template.");
	}
}

export async function createTemplate({
	id,
	name,
	description,
	boards,
}: Template) {
	const data = JSON.stringify(boards);
	try {
		await sql`
		INSERT INTO templates
			(id, name, description, data)
		VALUES
			(${id}, ${name}, ${description}, ${data});
		`;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to create template");
	}
}
