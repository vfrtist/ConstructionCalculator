import { CutInput, BoardData, Project, ProjectBoards } from "./structures";

export function newCutInput(): CutInput {
	return { id: crypto.randomUUID(), length: 0, qty: 1, name: "" };
}

export function newBoardData(): BoardData {
	return { name: "", boardLength: 96, cutInputs: [newCutInput()] };
}

export function newProjectBoards(): ProjectBoards {
	return { [crypto.randomUUID()]: newBoardData() };
}

export function newProject(name: string, data?: ProjectBoards): Project {
	return {
		id: crypto.randomUUID(),
		name: name,
		updatedAt: new Date().toISOString(),
		boards: data ? structuredClone(data) : newProjectBoards(),
	};
}
