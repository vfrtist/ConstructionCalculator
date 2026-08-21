export interface CutDimension {
	length: number;
	name: string;
}

export interface CutInput extends CutDimension {
	id: string;
	qty: number;
}

export class ListNode {
	next: ListNode | null = null;
	value: number;
	constructor(value: number) {
		this.value = value;
	}
}

export interface BoardData {
	name: string;
	boardLength: number;
	cutInputs: CutInput[];
}

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

export type ProjectType = "project" | "template";

export type UserRole = "owner" | "editor" | "viewer";

export interface User {
	id: string;
}

export interface ProjectDB extends Omit<Project, "data"> {
	data: string;
}
