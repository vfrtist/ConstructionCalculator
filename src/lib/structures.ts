// Generics
export class ListNode {
	next: ListNode | null = null;
	value: number;
	constructor(value: number) {
		this.value = value;
	}
}

// Boards
export interface CutDimension {
	length: number;
	name: string;
}

export interface CutInput extends CutDimension {
	id: string;
	qty: number;
}

export interface BoardData {
	name: string;
	boardLength: number;
	cutInputs: CutInput[];
}

// Projects
export type ProjectBoards = Record<string, BoardData>;

export interface ProjectSummary {
	id: string;
	name: string;
	updatedAt: string;
	description: string;
}

export interface Project extends ProjectSummary {
	data: ProjectBoards;
}

export interface ProjectDB extends Omit<Project, "data"> {
	data: string;
}

export type ProjectRole = "owner" | "editor" | "viewer";

export interface UserSummary extends ProjectSummary {
	role: ProjectRole;
}

// Users
export interface UserRole {
	role: ProjectRole;
}

export function isUserSummary(summary: ProjectSummary): summary is UserSummary {
	return "role" in summary;
}
