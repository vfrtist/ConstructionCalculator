"use server";
import { UserRole } from "@/lib/structures";
import { sql, createClient } from "./db";
import { redirect } from "next/navigation";

export async function fetchCurrentUser() {
	const client = await createClient();
	const {
		data: { user },
	} = await client.auth.getUser();
	return user;
}

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
	ON CONFLICT (userID) DO NOTHING;
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

export async function signUp(email: string, password: string) {
	const client = await createClient();
	const { data, error } = await client.auth.signUp({
		email,
		password,
	});

	if (error) {
		console.error(error.message);
		return;
	}

	if (data.user) {
		await createNewUser(data.user.id, email);
	}
	redirect("/manager");
}
export async function signIn(email: string, password: string) {
	const client = await createClient();
	const { error } = await client.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error(error.message);
		return;
	}
	redirect("/manager");
}

export async function signOut() {
	// Supabase signOut
}
