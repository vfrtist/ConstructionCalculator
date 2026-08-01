import { signOut } from "@/services/browserServices";
import "@/styles/Header.css";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
}
export default function Header({ title, ...headerProps }: HeaderProps) {
	return (
		<header {...headerProps}>
			<h1>{title}</h1>
			<button onClick={signOut}>Sign Out</button>
		</header>
	);
}
