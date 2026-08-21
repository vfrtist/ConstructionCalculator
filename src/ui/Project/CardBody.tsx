import { useContext } from "react";
import { CardContext, CardState } from "./Card";
import CutBody from "@/ui/Cut/CutBody";
import BoardBody from "@/ui/Board/BoardBody";
import PlanBody from "@/ui/Plan/PlanBody";

const BodyList: Record<CardState, React.ReactNode> = {
	board: <BoardBody />,
	cut: <CutBody />,
	plan: <PlanBody />,
};

export default function CardBody() {
	const { cardState } = useContext(CardContext);

	return BodyList[cardState];
}
