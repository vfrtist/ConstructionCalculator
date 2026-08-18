import { useContext } from "react";
import CarouselButton from "./CarouselButton";
import { ProjectContext } from "@/app/project/[id]/ProjectEditor";

export type CarouselPositions = "first" | "middle" | "last" | "single";

export interface CarouselControlProps {
	state: CarouselPositions;
	currentIndex: number;
	handleIndexChange: (newIndex: number) => void;
}

export default function CarouselControls({
	state,
	currentIndex,
	handleIndexChange,
}: CarouselControlProps) {
	const { addBoard } = useContext(ProjectContext);
	return (
		<div className="CarouselControls">
			<CarouselButton
				key="CarouselLeft"
				buttonType={"left"}
				onClick={() => handleIndexChange(currentIndex - 1)}
				className={
					state === "first" || state === "single" ? "disabled" : ""
				}
			/>
			<CarouselButton
				key="CarouselRight"
				buttonType={
					state === "last" || state === "single" ? "add" : "right"
				}
				onClick={() =>
					state === "single" || state === "last" && addBoard()
			handleIndexChange(currentIndex + 1)
				}
			/>
		</div>
	);
}
