import { useContext } from "react";
import CutLine from "./CutLine";
import ThemeButton from "@/ui/Generic/ThemeButton";
import { CardContext } from "@/ui/Project/Card";
import { newCutInput } from "@/lib/objects";
import "@/styles/CutBody.css";
import Icon from "../Generic/Icon";

export default function CutBody() {
	const { cutInputs, setCutInputs } = useContext(CardContext);

	function addLine() {
		setCutInputs([...cutInputs, newCutInput()]);
	}

	return (
		<div className="CutBody container vertical">
			<header className="CardHeader container horizontal">
				<span>L</span>
				<span>Q</span>
				<span>Name</span>
			</header>
			<ul className="CutLines container vertical">
				{cutInputs.map((values) => (
					<CutLine key={`${values.id}`} values={values} />
				))}
			</ul>
			<ThemeButton type="button" className="add" onClick={addLine}>
				<Icon iconKey="add" />
			</ThemeButton>
		</div>
	);
}
