"use server";

import { ProjectSummary, Template, TemplateDB } from "@/lib/structures";
import { sql } from "./db";
import { dbToTemplate, templateToDB } from "@/lib/objects";

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

export async function fetchTemplate(templateID: string): Promise<Template> {
	try {
		const template = await sql<TemplateDB[]>`
		SELECT *
		FROM templates
		WHERE id = ${templateID}
		`;
		return dbToTemplate(template[0]);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to find matching template.");
	}
}

export async function createTemplate(template: Template) {
	const { id, name, description, data } = templateToDB(template);
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
