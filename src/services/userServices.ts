"use server";
import { UserRole } from "@/lib/structures";
import { sql } from "./db";
import { fetchCurrentUser } from "./serverServices";

// will be useful maybe to implement getSession().session.user after fetch current.
export async function fetchUserExists(email: string) {
	const results = await sql`
	SELECT 1
	FROM users
	where username = ${email}
	LIMIT 1;
	`;
	return results.length != 0;
}

export async function fetchUser(id: string) {
	const results = await sql`
	SELECT *
	FROM users
	WHERE id = ${id}
	LIMIT 1;
	`;
	return results.length != 0;
}

export async function fetchCurrentUserRole(projectID: string) {
	const user = await fetchCurrentUser();
	if (!user) return;
	try {
		const results = await sql`
		SELECT role
		FROM project_users
		WHERE userID = ${user.id}
		AND	projectID = ${projectID};
		`;
		return results[0];
	} catch (error) {
		console.error("could not find user on project:", error);
		throw new Error("Failed to find user project");
	}
}

export async function createProjectUser(
	userID: string,
	projectID: string,
	role: UserRole,
) {
	return await sql`
	INSERT INTO project_users
	(userID, projectID, role)
	VALUES
	(${userID}, ${projectID}, ${role})
	`;
}

export async function createNewUser(id: string, email: string) {
	return await sql`
	INSERT INTO users
	(id, username)
	VALUES
	(${id}, ${email})
	`;
}
