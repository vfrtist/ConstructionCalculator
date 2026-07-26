"use server";
import { UserRole } from "@/lib/structures";
import { sql, createClient } from "./db";

export async function fetchCurrentUser() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user;
}

// will be useful maybe to implement getSession().session.user after fetch current.
export async function fetchUser(email: string) {
	const results = await sql`
	SELECT 
		*
	FROM users
	WHERE email = ${email}
	LIMIT 1
	`;
	console.log(results);
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

export async function createNewUser(id: string, username: string) {
	return await sql`
	INSERT INTO users
		(id, username)
	VALUES
		(${id}, ${username})
	`;
}

export async function signUp(
	email: string,
	password: string,
	username: string,
) {
	// Supabase signUp
	// Create user profile
}

export async function signIn(email: string, password: string) {
	// Supabase signInWithPassword
}

export async function signOut() {
	// Supabase signOut
}
