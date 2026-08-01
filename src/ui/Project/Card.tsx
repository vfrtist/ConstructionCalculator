import { createContext, SetStateAction, useState, Dispatch } from "react";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import { BoardData, CutInput, ProjectBoards } from "@/lib/structures";

export type CardState = "board" | "cut";

export interface CardData extends BoardData {
	cardState: CardState;
	setBoardLength: Dispatch<SetStateAction<number>>;
	setCardState: Dispatch<SetStateAction<CardState>>;
	setCutInputs: Dispatch<SetStateAction<CutInput[]>>;
	setName: Dispatch<SetStateAction<string>>;
}

interface CardProps {
	id: string;
	data: BoardData;
	setProjectData: Dispatch<SetStateAction<ProjectBoards>>;
}

export const CardContext = createContext<CardData>({
	name: "",
	boardLength: 96,
	cardState: "board",
	cutInputs: [],
	setBoardLength: () => {},
	setCardState: () => {},
	setCutInputs: () => {},
	setName: () => {},
});

export default function Card({ id, data, setProjectData }: CardProps) {
	const [cardState, setCardState] = useState<CardState>("cut");

	function updaterFunction(updater: (prev: BoardData) => BoardData) {
		setProjectData((prev) => ({
			...prev,
			[id]: updater(prev[id]),
		}));
	}

	return (
		<div className="card">
			<CardContext.Provider
				value={{
					name: data.name,
					boardLength: data.boardLength,
					cardState: cardState,
					cutInputs: data.cutInputs,
					setBoardLength: (length) =>
						updaterFunction((prev) => ({
							...prev,
							boardLength:
								typeof length === "function"
									? length(prev.boardLength)
									: length,
						})),
					setCardState: (state) => setCardState(state),
					setCutInputs: (inputs) =>
						updaterFunction((prev) => ({
							...prev,
							cutInputs:
								typeof inputs === "function"
									? inputs(prev.cutInputs)
									: inputs,
						})),
					setName: (name) =>
						updaterFunction((prev) => ({
							...prev,
							name:
								typeof name === "function"
									? name(prev.name)
									: name,
						})),
				}}
			>
				<CardHeader />
				<CardBody />
				<CardFooter />
			</CardContext.Provider>
		</div>
	);
}
