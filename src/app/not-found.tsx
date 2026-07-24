import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<h1>Project not found</h1>
			<p>{`The project you're looking for doesn't exist.`}</p>

			<Link href="/Manager">Return to Manager</Link>
		</>
	);
}
