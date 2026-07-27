import {
	CutInput,
	BoardData,
	Project,
	ProjectBoards,
	ProjectDB,
} from "./structures";

export function newCutInput(): CutInput {
	return { id: crypto.randomUUID(), length: 0, qty: 1, name: "" };
}

export function newBoardData(): BoardData {
	return { name: "", boardLength: 96, cutInputs: [newCutInput()] };
}

export function newProjectBoards(): ProjectBoards {
	return { [crypto.randomUUID()]: newBoardData() };
}

export function newProject(
	name: string,
	description: string = "",
	data?: ProjectBoards,
): Project {
	return {
		id: crypto.randomUUID(),
		name: name,
		description: description,
		updatedAt: new Date().toISOString(),
		data: data ? structuredClone(data) : newProjectBoards(),
	};
}

export function duplicateProject(project: Project): Project {
	return { ...project, data: structuredClone(project.data) };
}

export function dbToProject(db: ProjectDB): Project {
	return { ...db, data: JSON.parse(db.data) };
}

export function projectToDB(project: Project): ProjectDB {
	return { ...project, data: JSON.stringify(project.data) };
}
