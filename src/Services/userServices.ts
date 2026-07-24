import { User, UserRole } from "@/lib/structures";
import { sql } from "./db";

export async function getCurrentUser(): Promise<User> {
	return { id: "test-user-for-now" };
}

export async function addProjectUser(
	userID: string,
	projectID: string,
	role: UserRole,
) {
	// insert into ProjectUsers with data.
}
