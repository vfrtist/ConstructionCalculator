import postgres from "postgres";
import { Project1, Project2, BlankTemplate } from "@/Data/TestData";
import {
	Project,
	ProjectSummary,
	Template,
	User,
	UserRole,
} from "@/lib/structures";
import { newProject } from "@/lib/objects";

// Blank structures

// Database functions
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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

// Project User
export async function addProjectUser(
	userID: string,
	projectID: string,
	role: UserRole,
) {
	// insert into ProjectUsers with data.
}

// Templates
export async function getAllTemplates() {
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

export async function getTemplate(templateID: string) {
	const templates = [BlankTemplate];
	const template = templates.find((t) => t.id === templateID);
	return template ?? null;
}

export async function getCurrentUser(): Promise<User> {
	return { id: "test-user-for-now" };
}
