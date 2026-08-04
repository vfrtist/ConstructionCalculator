import { useContext } from "react";
import { CardContext } from "./Card";
import ToggleButtonGroup from "@/ui/Generic/ToggleButtonGroup";
import ToggleButton from "@/ui/Generic/ToggleButton";

export default function CardFooter() {
	const { cardState, setCardState } = useContext(CardContext);

	return (
		<ToggleButtonGroup activeValue={cardState} onChange={setCardState}>
			<ToggleButton value="board" caption="Board" />
			<ToggleButton value="cut" caption="Cut" />
			<ToggleButton value="plan" caption="Plan" />
		</ToggleButtonGroup>
	);
}
