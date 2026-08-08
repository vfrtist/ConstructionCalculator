import { useState } from "react";
import CarouselControls from "./CarouselControls";
import "@/styles/Carousel.css";

export interface CarouselProps {
	children: React.ReactNode[];
}

export default function Carousel({ children }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	function HandleIndexChange(newIndex: number) {
		if (newIndex <= 0) {
			setCurrentIndex(0);
			return;
		}
		if (newIndex >= children.length) {
			setCurrentIndex(children.length - 1);
			return;
		}
	}

	return (
		<div className="Carousel">
			<div className="CarouselContainer">
				<CarouselControls
					handleIndexChange={HandleIndexChange}
					currentIndex={currentIndex}
					state={
						children.length === 1
							? "single"
							: currentIndex === 0
								? "first"
								: currentIndex === children.length - 1
									? "last"
									: "middle"
					}
				/>

				{children.map((child, index) => (
					<div
						key={index}
						className={`CarouselItem ${index === currentIndex ? "active" : ""}`}
						id={`carousel-item-${index}`}
					>
						{child}
					</div>
				))}
			</div>
			<nav
				className="Bullets"
				role="tablist"
				aria-label="Carousel Navigation"
			>
				{children.map((_, index) => (
					<a
						href={`#carousel-item-${index}`}
						role="tab"
						key={index}
						className={`Bullet ${index === currentIndex ? "active" : ""}`}
						aria-selected={index === currentIndex}
						aria-controls={`carousel-item-${index}`}
					/>
				))}
			</nav>
		</div>
	);
}
