import { CutInput } from "./structures";
import { BoardList, CutBoard } from "./BoardList";

export function getCutBoards(
	length: number,
	cutInputs: CutInput[],
): CutBoard[] {
	const list = new BoardList(length);
	list.setCuts(cutInputs);
	return list.boardList;
}

function* arrayReducer(
	boards: CutBoard[],
): Generator<[qty: number, value: CutBoard]> {
	if (boards.length === 0) {
		return;
	}
	if (boards.length === 1) {
		yield [1, boards[0]];
		return;
	}
	let left = boards[0];
	let count = 1;
	for (let index = 1; index < boards.length; index++) {
		const right = boards[index];
		if (left.equals(right)) {
			count++;
		} else {
			yield [count, left];
			left = right;
			count = 1;
		}
	}
	yield [count, left];
}

export function getCompactCutBoards(
	cutBoards: CutBoard[],
): [qty: number, value: CutBoard][] {
	return [...arrayReducer(cutBoards)];
}
