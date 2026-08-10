import { useContext } from "react";
import CutLine from "./CutLine";
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
			<header className="CardHeader container horizontal">
				<div>L</div>
				<div>Q</div>
				<div>Name</div>
			</header>
			<ul className="CutLines container vertical">
				{cutInputs.map((values) => (
					<CutLine key={`${values.id}`} values={values} />
				))}
			</ul>
			<ThemeButton type="button" className="add" onClick={addLine}>
				+
			</ThemeButton>
		</div>
	);
}
