import { Project, ProjectSummary } from "@/lib/structures";
import { newProject } from "@/lib/objects";
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

export async function createProject(
	userID: string,
	name: string,
	data: Project,
): Promise<Project | null> {
	const project = newProject(name, data.boards);
	// insert into Projects
	await createProjectUser(userID, project.id, "owner");
	return project;
}

export async function updateProject(project: Project) {
	const { id, name, boards } = project;
	const data = JSON.stringify(boards);

	await sql`
	UPDATE projects
	SET 
		name = ${name}, 
		data = ${data}
	WHERE id = ${id}
	`;
}
