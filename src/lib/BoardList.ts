import { CutDimension, CutInput, ListNode } from "./structures";

class BoardNode extends ListNode {
	items: CutBoard[] = [];
	next: BoardNode | null = null;
}

export class CutBoard {
	// For storing cut lengths of a single board
	length: number;
	kerf: number;
	cuts: CutDimension[] = [];
	remainingLength: number;
	id: string;

	constructor(length: number, kerf: number = 0.125) {
		this.length = length;
		this.remainingLength = length;
		this.kerf = kerf;
		this.id = crypto.randomUUID();
	}

	cut(cutBoard: CutDimension) {
		if (cutBoard.length > this.remainingLength) {
			throw new Error("Not enough remaining length to cut");
		}
		this.cuts.push(cutBoard);
		this.remainingLength -= cutBoard.length;
		if (this.remainingLength > 0) {
			this.remainingLength -= this.kerf;
		}
	}

	get cutPlan(): CutDimension[] {
		return this.cuts;
	}

	get remainder(): number {
		return this.remainingLength;
	}

	equals(board: CutBoard): boolean {
		// If they aren't the same number of cuts we already know they don't match.
		if (this.cutPlan.length != board.cutPlan.length) {
			return false;
		}
		// if they are the same length we can check their individual values in order.
		for (let index = 0; index < this.cutPlan.length; index++) {
			if (this.cutPlan[index].length !== board.cutPlan[index].length) {
				return false;
			}
		}
		return true;
	}
}

export class BoardList {
	// This is a specialized linked list
	head: BoardNode | null = null;
	length: number;
	cuts: CutDimension[] = [];

	constructor(length: number) {
		this.length = length;
	}

	calculate() {
		this.head = null;
		this.cutAllBoards();
	}

	get boardList(): CutBoard[] {
		this.calculate();

		const boards: CutBoard[] = [];

		if (this.head != null) {
			let current: BoardNode | null = this.head;

			while (current !== null) {
				current.items.forEach((board) => {
					boards.push(board);
				});
				current = current.next;
			}
		}
		return boards;
	}

	setCuts(cuts: CutInput[]) {
		this.cuts = this.expandCuts(cuts);
	}

	cutAllBoards() {
		// sort all boards in reverse order
		this.cuts.sort((a, b) => b.length - a.length);
		this.cuts.forEach((cut) => {
			let previous: BoardNode | null = null;
			let current = this.head;

			// find the first node with enough remainder
			while (current !== null) {
				if (cut.length <= current.value && current.items.length > 0) {
					const board = current.items.pop()!;
					if (current.items.length === 0) {
						this.removeNode(previous, current);
					}
					board.cut(cut);
					this.insertBoard(board);
					break;
				}
				previous = current;
				current = current.next;
			}

			// No matching board, create a new one.
			if (current === null) {
				const board = this.getNewboard(cut);
				this.insertBoard(board);
			}
		});
	}

	expandCuts(cuts: CutInput[]): CutDimension[] {
		const expanded: CutDimension[] = [];

		cuts.forEach((cut) => {
			for (let i = 0; i < cut.qty; i++) {
				expanded.push({ length: cut.length, name: cut.name });
			}
		});

		return expanded;
	}

	getNewboard(cutLength: CutDimension): CutBoard {
		const board = new CutBoard(this.length);
		board.cut(cutLength);
		return board;
	}

	addCut(cutLength: number, name: string, qty: number = 1) {
		for (let index = 0; index < qty; index++) {
			const cutBoard: CutDimension = { length: cutLength, name };
			this.cuts.push(cutBoard);
		}
	}

	insertBoard(board: CutBoard) {
		const remainder = board.remainder;
		const newNode = new BoardNode(remainder);
		newNode.items.push(board);

		// Empty list check
		if (this.head === null) {
			this.head = newNode;
			return;
		}

		let previous: BoardNode | null = null;
		let current: BoardNode | null = this.head;

		// Find the node where the remainder fits in.
		while (current !== null && current.value < remainder) {
			previous = current;
			current = current.next;
		}

		// If the reaminder is equal, push the board
		if (current !== null && current.value === remainder) {
			current.items.push(board);
			return;
		}

		// Insert a brand new node to either the head or the tail
		newNode.next = current;
		if (previous === null) {
			this.head = newNode;
		} else {
			previous.next = newNode;
		}
	}

	removeNode(previous: BoardNode | null, nodeToRemove: BoardNode) {
		// if there is no previous item, set the head to the next node.
		if (previous === null) {
			this.head = nodeToRemove.next;
		} else {
			previous.next = nodeToRemove.next;
		}
	}
}
