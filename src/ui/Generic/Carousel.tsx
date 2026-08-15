import { useState, useRef, useEffect } from "react";
import CarouselControls from "./CarouselControls";
import "@/styles/Carousel.css";

export interface CarouselProps {
	children: React.ReactNode[];
	// addButton?: Function;
}

export default function Carousel({ children }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);

	function HandleIndexChange(newIndex: number) {
		let index = newIndex;
		if (newIndex <= 0) {
			index = 0;
		}
		if (newIndex >= children.length) {
			index = children.length - 1;
		}
		setCurrentIndex(index);
		const card = document.getElementById(`carousel-item-${index}`);
		card?.scrollIntoView();
	}

	useEffect(() => {
		const container = containerRef.current;

		if (!container) return;

		const items = container.querySelectorAll(".CarouselItem");

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = [...items].indexOf(entry.target);
						setCurrentIndex(index);
					}
				});
			},
			{ root: container, threshold: 0.6 },
		);

		items.forEach((item) => {
			observer.observe(item);
		});

		return () => observer.disconnect();
	}, [children.length]);
	return (
		<div className="Carousel">
			<div className="CarouselContainer" ref={containerRef}>
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
					<button
						onClick={() => {
							HandleIndexChange(index);
						}}
						type="button"
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
