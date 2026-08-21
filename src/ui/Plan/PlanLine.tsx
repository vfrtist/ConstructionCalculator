import { CutBoard } from "@/lib/BoardList";
import SubBoard from "./SubBoard";

interface PlanLineProps {
	length: number;
	board: CutBoard;
	qty?: number;
}

export default function PlanLine({ ...props }: PlanLineProps) {
	return (
		<li className="CardLine">
			{props.qty && <span className="qty">{`${props.qty}`}</span>}
			<div className="Board container horizontal">
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
			</div>
		</li>
	);
}
