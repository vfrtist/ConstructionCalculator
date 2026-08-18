import { useContext, useMemo } from "react";
import { CardContext } from "@/ui/Project/Card";
import { getCompactCutBoards, getCutBoards } from "@/lib/optimizer";
import PlanLine from "./PlanLine";
import "@/styles/PlanBody.css";

export default function PlanBody() {
	const { boardLength, cutInputs } = useContext(CardContext);
	const boardList = useMemo(
		() => getCutBoards(boardLength, cutInputs),
		[boardLength, cutInputs],
	);

	const qty = boardList.length;
	// Possible to implement a display style option for compact vs expanded view which would toggle this on/off.
	// For now compact is the only view and the other option would be to map over the boardList instead of compact List
	const compactList = useMemo(
		() => getCompactCutBoards(boardList),
		[boardList],
	);

	return (
		<div className="PlanBody">
			<header className="CardHeader container horizontal">
				<span>Q</span>
				<span>Board</span>
			</header>
			<ul className="PlanLines container vertical">
				{[...compactList].map(([qty, value]) => (
					<PlanLine
						key={value.id}
						length={value.length}
						board={value}
						qty={qty}
					/>
				))}

				{/* {boardList.map((board, index) => (
              <Board key={index.toString()} length={board.length} board={board} />
            ))} */}
			</ul>
			<footer className="PlanQty">Total: {qty}</footer>
		</div>
	);
}
