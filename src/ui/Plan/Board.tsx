import { CutBoard } from "@/lib/BoardList";
import SubBoard from "./SubBoard";

export interface BoardProps {
	length: number;
	board: CutBoard;
	qty?: number;
}

export default function Board({ ...props }: BoardProps) {
	return (
		<li className="Board container horizontal">
			{props.qty && <span className="qty">{`${props.qty}`}</span>}
			{props.board.cuts.map((cut, index) => (
				<SubBoard
					key={props.board.id + index}
					length={cut.length}
					name={cut.name}
				/>
			))}
			{props.board.remainingLength > 0 && (
				<SubBoard
					length={props.board.remainingLength}
					classNames={"remainder"}
				/>
			)}
		</li>
	);
}
