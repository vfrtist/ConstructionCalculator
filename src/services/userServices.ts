"use server";
import { UserRole } from "@/lib/structures";
import { sql } from "./db";

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
