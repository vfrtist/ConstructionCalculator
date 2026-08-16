import { newProject } from "@/lib/objects";
import { sql } from "@/services/db";
import { createTemplate } from "@/services/templateServices";
import { DemoTemplate } from "./TestData";

export async function seed() {
	await sql`
    DROP TABLE project_users;`;

	await sql`
    DROP TABLE users;`;

	await sql`
    DROP TABLE templates;`;

	await sql`
    DROP TABLE projects;`;

	await sql`
    CREATE TABLE IF NOT EXISTS
    users (
        id UUID PRIMARY KEY REFERENCES auth.users(id),
        username VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

	await sql`
    CREATE TABLE IF NOT EXISTS
    templates (
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data JSON NOT NULL
    );`;

	await sql`
    CREATE TABLE IF NOT EXISTS
    projects (
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data JSON NOT NULL
    );`;

	await sql`
    CREATE TABLE
    project_users (
        PRIMARY KEY (userID, projectID),
        role VARCHAR(10) NOT NULL
        CHECK (role IN ('owner', 'editor', 'viewer')),
        userID UUID NOT NULL,
        projectID UUID NOT NULL,
        FOREIGN KEY (userID) references users (id)
        ON DELETE CASCADE
        ,
        FOREIGN KEY (projectID) references projects (id)
        ON DELETE CASCADE
    );`;

	const blankTemplate = newProject(
		"Blank Template",
		"Start from scratch with a blank template",
	);

	await createTemplate(blankTemplate);
	await createTemplate(DemoTemplate);
}
