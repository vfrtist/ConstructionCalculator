import { useContext } from "react";
import { CardContext } from "./Card";
import CutListBody from "@/ui/CutList/CutListBody";
import BoardListBody from "@/ui/BoardList/BoardListBody";

export default function CardBody() {
	const { cardState } = useContext(CardContext);

	if (cardState === "cut") {
		return <CutListBody></CutListBody>;
	}
	return <BoardListBody></BoardListBody>;
}
