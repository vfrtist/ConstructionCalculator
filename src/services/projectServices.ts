"use server";

import { Project, ProjectSummary, ProjectDB } from "@/lib/structures";
import { sql } from "./db";
import { createProjectUser } from "./userServices";
import { dbToProject, newProject, projectToDB } from "@/lib/objects";
import { fetchCurrentUserID } from "./serverServices";

export async function fetchUserRecentProjects(userID: string) {
	try {
		const projects = await sql<ProjectSummary[]>`
		SELECT
			p.id,
			p.name,
			p.description,
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
		const project = await sql<ProjectDB[]>`
		SELECT
			*
		FROM projects
		WHERE id = ${projectID}
		LIMIT 1;`;

		return dbToProject(project[0]);
	} catch (error) {
		console.error("database error:", error);
		throw new Error("failed to find a project match");
	}
}

export async function createProject(sourceProject: Project) {
	const userID = await fetchCurrentUserID();
	if (!userID) {
		throw new Error("Not authenticated");
	}

	const { id, name, description, data } = projectToDB(
		newProject(sourceProject),
	);
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

	if (await createProjectUser(userID, id, "owner")) return id;
}

export async function updateProject(project: Project) {
	const { id, name, description, data } = projectToDB(project);
	await sql`
	UPDATE projects
	SET 
		name = ${name}, 
		description = ${description}, 
		data = ${data}
	WHERE id = ${id}
	`;
}

export async function updateProjectSummary(summary: ProjectSummary) {
	const { name, description, id } = summary;
	console.log(summary);

	await sql`
	UPDATE projects
	SET
		name = ${name},
		description = ${description}
	WHERE id = ${id}
	`;
}

export async function deleteProject(id: string) {
	const result = await sql`
	DELETE FROM projects
	WHERE id = ${id}
		RETURNING id;
	`;

	return result.length > 0;
}
