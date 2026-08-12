import { signOut } from "@/services/browserServices";
import Link from "next/link";

import "@/styles/Header.css";
import Icon from "./Icon";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	// rightFunction?: Function;
	goBack?: string;
}
export default function Header({ goBack, ...headerProps }: HeaderProps) {
	return (
		<header className="mainHeader" {...headerProps}>
			{goBack && (
				<Link href={goBack}>
					<Icon iconKey="chevron" />
				</Link>
			)}
			{/* <button onClick={signOut}>Sign Out</button> */}
		</header>
	);
}
