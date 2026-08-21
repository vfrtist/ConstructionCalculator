"use server";

import { Project, ProjectDB, ProjectSummary } from "@/lib/structures";
import { sql } from "./db";
import { dbToProject, projectToDB } from "@/lib/objects";

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

export async function fetchTemplate(templateID: string): Promise<Project> {
	try {
		const template = await sql<ProjectDB[]>`
		SELECT *
		FROM templates
		WHERE id = ${templateID}
		`;
		return dbToProject(template[0]);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to find matching template.");
	}
}

export async function createTemplate(template: Project) {
	const { id, name, description, data } = projectToDB(template);
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
