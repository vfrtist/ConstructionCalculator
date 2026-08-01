import { useContext } from "react";
import CutBoardLine from "./CutListLine";
import ThemeButton from "@/ui/Generic/ThemeButton";
import { CardContext } from "@/ui/Generic/Card";
import { newCutInput } from "@/lib/objects";
import "@/styles/CutList.css";

export default function CutListBody() {
	const { cutInputs, setCutInputs } = useContext(CardContext);

	function addLine() {
		setCutInputs((prev) => [...prev, newCutInput()]);
	}

	return (
		<div className="CutListBody">
			<div className="CutListHeader container horizontal">
				<div>Length</div>
				<div></div>
				<div>Qty</div>
				<div>Name</div>
			</div>
			<form action="" className="CutListLines container vertical">
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
