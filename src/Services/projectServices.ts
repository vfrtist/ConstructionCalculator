import { Project, ProjectSummary } from "@/lib/structures";
import { sql } from "./db";
import { createProjectUser } from "./userServices";

// Database functions
export async function fetchUserRecentProjects(userID: string) {
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

export async function fetchProject(projectID: string): Promise<Project> {
	try {
		const project = await sql<Project[]>`
		SELECT
			*
		FROM projects
		WHERE id = ${projectID}
		LIMIT 1;`;
		return project[0];
	} catch (error) {
		console.error("database error:", error);
		throw new Error("failed to find a project match");
	}
}

export async function createProject(userID: string, project: Project) {
	const { id, name, description, boards } = project;
	const data = JSON.stringify(boards);

	try {
		await sql`
		INSERT INTO projects
			(id, name, description, data)
		VALUES
			(${id}, ${name}, ${description}, ${data})
		`;
	} catch (error) {
		console.error("Database error:", error);
		throw new Error("failed to create project");
	}

	await createProjectUser(userID, id, "owner");
}

export async function updateProject(project: Project) {
	const { id, name, description, boards } = project;
	const data = JSON.stringify(boards);

	await sql`
	UPDATE projects
	SET 
		name = ${name}, 
		description = ${description}, 
		data = ${data}
	WHERE id = ${id}
	`;
}
