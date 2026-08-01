import { useContext, useMemo } from "react";
import { CardContext } from "@/ui/Generic/Card";
import Board from "./Board";
import { getCutBoards, getCompactCutBoards } from "@/lib/optimizer";
import "@/Stylings/BoardList.css";

export default function BoardListBody() {
	const { boardLength, cutInputs } = useContext(CardContext);
	const boardList = useMemo(
		() => getCutBoards(boardLength, cutInputs),
		[boardLength, cutInputs],
	);

	// Possible to implement a display style option for compact vs expanded view which would toggle this on/off.
	// For now compact is the only view and the other option would be to map over the boardList instead of compact List
	const compactList = useMemo(
		() => getCompactCutBoards(boardList),
		[boardList],
	);

	return (
		<div className="BoardListBody">
			<ul className="container vertical">
				{[...compactList].map(([qty, value]) => (
					<Board
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
		</div>
	);
}
