import { Project, ProjectSummary } from "@/lib/structures";
import { newProject } from "@/lib/objects";
import { sql } from "./db";
import { addProjectUser } from "./userServices";
import { getTemplate } from "./templateServices";

// Database functions
export async function getUserRecentProjects(userID: string) {
	try {
		const projects = await sql<ProjectSummary[]>`
		SELECT
			p.id,
			p.name,
			p.updated_at
		FROM projects p
		JOIN project_users pu ON pu.projectID = p.id
		WHERE pu.userID = ${userID}
		ORDER BY p.updated_at DESC;
		`;
		return projects;
	} catch (error) {
		console.error("database error:", error);
		throw new Error("Failed to load recent projects");
	}
}

export async function loadProject(projectID: string): Promise<Project> {
	try {
		const project = await sql<Project[]>`
		SELECT
			*
		FROM projects
		WHERE projects.id = ${projectID}
		LIMIT 1;`;
		return project[0];
	} catch (error) {
		console.error("database error:", error);
		throw new Error("failed to find a project match");
	}
}

export async function createProject(
	userID: string,
	templateID: string,
	name: string,
): Promise<Project | null> {
	const template = await getTemplate(templateID);

	if (!template) {
		throw new Error("Template not found");
	}

	const project = newProject(name, template.boards);
	// insert into Projects
	await addProjectUser(userID, project.id, "owner");

	return project;
}

export async function updateProject(projectID: string, query: string) {
	// await sql, generalized
}
