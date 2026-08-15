import Icon from "./Icon";

export type CarouselButtonTypes = "left" | "right" | "add";

export interface CarouselButtonProps {
	buttonType: CarouselButtonTypes;
	className?: string;
	onClick?: () => void;
}

export default function CarouselButton({
	className,
	onClick,
	buttonType,
}: CarouselButtonProps) {
	return (
		<button
			className={`CarouselButton ${buttonType} ${className || ""}`}
			onClick={onClick}
		>
			<Icon iconKey={buttonType} />
		</button>
	);
}
