import { useContext } from "react";
import CutBoardLine from "./CutListLine";
import ThemeButton from "@/ui/Generic/ThemeButton";
import { CardContext } from "@/ui/Project/Card";
import { newCutInput } from "@/lib/objects";
import "@/styles/CutBody.css";

export default function CutBody() {
	const { cutInputs, setCutInputs } = useContext(CardContext);

	function addLine() {
		setCutInputs((prev) => [...prev, newCutInput()]);
	}

	return (
		<div className="CutBody">
			<div className="CutHeader container horizontal">
				<div>L</div>
				<div>Q</div>
				<div>N</div>
			</div>
			<form action="" className="CutLines container vertical">
				{cutInputs.map((values) => (
					<CutBoardLine key={`${values.id}`} values={values} />
				))}
				<ThemeButton type="button" className="add" onClick={addLine}>
					+
				</ThemeButton>
			</form>
		</div>
	);
}
