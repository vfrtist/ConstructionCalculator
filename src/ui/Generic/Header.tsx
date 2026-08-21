import "@/styles/Header.css";
import Icon from "./Icon";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	leftElements?: React.ReactNode;
	rightElements?: React.ReactNode;
	goBack?: string;
}
export default function Header({
	leftElements,
	rightElements,
	...headerProps
}: HeaderProps) {
	return (
		<header className="mainHeader" {...headerProps}>
			{leftElements && (
				<div className="left headerbox"> {leftElements}</div>
			)}
			<div className="middle headerbox">
				<Icon iconKey="logoFull"></Icon>
			</div>
			{rightElements && (
				<div className="right headerbox"> {rightElements}</div>
			)}
		</header>
	);
}
