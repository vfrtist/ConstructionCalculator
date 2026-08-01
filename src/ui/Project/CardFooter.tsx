import { useContext } from "react";
import { CardContext } from "../Project/Card";
import ToggleButtonGroup from "./ToggleButtonGroup";
import ToggleButton from "./ToggleButton";

export default function CardFooter() {
	const { cardState, setCardState } = useContext(CardContext);

	return (
		<ToggleButtonGroup activeValue={cardState} onChange={setCardState}>
			<ToggleButton value="cut" caption="Cut List" />
			<ToggleButton value="board" caption="Board List" />
		</ToggleButtonGroup>
	);
}
