import { useContext } from "react";
import { CardContext } from "@/ui/Project/Card";
import "@/styles/BoardBody.css";

export default function BoardBody() {
	const { boardLength, setBoardLength, setName, name } =
		useContext(CardContext);

	return (
		<form action="" className="BoardBody container vertical">
			<div className="formRow container vertical">
				<label htmlFor="name">Name</label>
				<input
					className="NameInput"
					type="text"
					name="name"
					id="name"
					placeholder="name"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
			</div>

			<div className="formRow container vertical">
				<label htmlFor="length">Length</label>
				<input
					id="length"
					type="number"
					name="length"
					placeholder="96"
					// min={0}
					value={boardLength}
					onChange={(e) => {
						setBoardLength(Number(e.target.value));
					}}
				/>
			</div>
		</form>
	);
}
