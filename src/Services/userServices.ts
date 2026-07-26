import { UserRole } from "@/lib/structures";
import { sql, createClient } from "./db";

export async function fetchCurrentUser() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user;
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
