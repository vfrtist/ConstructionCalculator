import { User, UserRole } from "@/lib/structures";
import { sql } from "./db";
import bcrypt from "bcryptjs";

export async function fetchCurrentUser(): Promise<User> {
	return { id: "test-user-for-now" };
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

export async function createNewUser(email: string, userPassword: string) {
	const hashedPassword = await bcrypt.hash(userPassword, 10);
	const id = crypto.randomUUID();
	return await sql`
	INSERT INTO users
	(id, email, password, created_at)
	VALUES
	(${id}, ${email}, ${hashedPassword}, ${new Date().toISOString()})
	`;
}
