import { useContext } from "react";
import { CardContext } from "@/ui/Project/Card";
import { CutInput } from "@/lib/structures";

interface CutLineProps {
	values: CutInput;
}

export default function CutLine({ values }: CutLineProps) {
	const { setCutInputs, cutInputs } = useContext(CardContext);

	function lineUpdater(newCut: CutInput) {
		setCutInputs(
			cutInputs.map((cut) => (cut.id === newCut.id ? newCut : cut)),
		);
	}

	function removeLine() {
		setCutInputs(cutInputs.filter((cut) => cut.id !== values.id));
	}

	return (
		<li className="CardLine container horizontal">
			<input
				type="number"
				name="length"
				placeholder="length"
				min={0}
				value={values.length}
				onChange={(e) => {
					lineUpdater({ ...values, length: Number(e.target.value) });
				}}
			/>
			<input
				type="number"
				name="qty"
				placeholder="qty"
				min={1}
				step={1}
				value={values.qty}
				onChange={(e) => {
					lineUpdater({ ...values, qty: Number(e.target.value) });
				}}
			/>
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={values.name}
				className="name"
				onChange={(e) => {
					lineUpdater({ ...values, name: e.target.value });
				}}
			/>
			<button type="button" className="delete" onClick={removeLine}>
				x
			</button>
		</li>
	);
}
