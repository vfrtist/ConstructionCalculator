import { IconKey, IconList } from "@/data/IconList";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
	iconKey: IconKey;
}

export default function Icon({ iconKey, ...iconProps }: IconProps) {
	const { id, viewbox, path } = IconList[iconKey];
	return (
		<svg
			{...iconProps}
			key={id}
			className={`Icon ${id} ${iconProps.className || ""}`}
			version="1.1"
			viewBox={viewbox}
		>
			<path d={path} />
		</svg>
	);
}
