import "@/styles/Header.css";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	leftElements?: React.ReactNode[];
	rightElements?: React.ReactNode[];
	goBack?: string;
}
export default function Header({ leftElements, rightElements, ...headerProps }: HeaderProps) {
	return (
		<header className="mainHeader" {...headerProps}>
			{leftElements && <div className="headerLeft"> {leftElements}</div>}
			{rightElements && <div className="headerRight"> {rightElements}</div>}
		</header>
	);
}
