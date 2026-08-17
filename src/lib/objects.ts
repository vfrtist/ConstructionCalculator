import {
	CutInput,
	BoardData,
	Project,
	ProjectBoards,
	ProjectDB,
	ProjectSummary,
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

export function newProjectSummary(): ProjectSummary {
	return {
		id: crypto.randomUUID(),
		name: "",
		updatedAt: new Date().toISOString(),
		description: "",
	};
}

export function newProject(copyProject: Project): Project {
	return {
		...newProjectSummary(),
		description: copyProject.description ?? "",
		name: copyProject.name,
		data: copyProject.data
			? structuredClone(copyProject.data)
			: newProjectBoards(),
	};
}

export function dbToProject(db: ProjectDB): Project {
	return { ...db, data: JSON.parse(db.data) };
}

export function projectToDB(project: Project): ProjectDB {
	return { ...project, data: JSON.stringify(project.data) };
}
