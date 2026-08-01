import { useContext } from "react";
import { CardContext } from "../Project/Card";

export default function CardHeader({}) {
	const { boardLength, setBoardLength, setName, name } =
		useContext(CardContext);

	return (
		<form action="" className="CutBoardHeader">
			<input
				className="NameInput"
				type="text"
				name="name"
				placeholder="name"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>

			<input
				type="number"
				name="length"
				placeholder="96"
				// min={0}
				value={boardLength}
				onChange={(e) => {
					setBoardLength(Number(e.target.value));
				}}
			/>
		</form>
	);
}
