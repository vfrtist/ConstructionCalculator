import { IconKey, IconList } from "@/data/IconList";

export interface IconProps {
	iconKey: IconKey;
}

export default function Icon({ iconKey }: IconProps) {
	const { id, viewbox, path } = IconList[iconKey];
	return (
		<svg key={id} className="Icon" version="1.1" viewBox={viewbox}>
			<path d={path} />
		</svg>
	);
}
