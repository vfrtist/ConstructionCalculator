import { createContext, useState, useContext } from "react";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import { BoardData, CutInput } from "@/lib/structures";
import "@/styles/Card.css";
import { ProjectContext } from "@/app/project/[id]/ProjectEditor";

export type CardState = "board" | "cut" | "plan";

export interface CardData extends BoardData {
	cardState: CardState;
	setBoardLength: (length: number) => void;
	setCardState: (state: CardState) => void;
	setCutInputs: (inputs: CutInput[]) => void;
	setName: (name: string) => void;
}

interface CardProps {
	id: string;
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

export default function Card({ id }: CardProps) {
	const [cardState, setCardState] = useState<CardState>("board");
	const { setProjectData, data } = useContext(ProjectContext);
	const { name, boardLength, cutInputs } = data[id];
	console.log("----");
	console.log(data[id]);
	return (
		<CardContext.Provider
			value={{
				name: name,
				boardLength: boardLength,
				cardState: cardState,
				cutInputs: cutInputs,
				setCardState: (state) => setCardState(state),
				setBoardLength: (length) => {
					setProjectData(id, { ...data.data, boardLength: length });
				},
				setCutInputs: (inputs) => {
					setProjectData(id, { ...data.data, cutInputs: inputs });
				},
				setName: (name) => {
					setProjectData(id, { ...data.data, name: name });
				},
			}}
		>
			<div className="Card container vertical">
				<CardBody />
			</div>
			<CardFooter />
		</CardContext.Provider>
	);
}
