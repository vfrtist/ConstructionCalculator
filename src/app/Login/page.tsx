"use client";
import { fetchUser } from "@/Services/userServices";
import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit() {
		await fetchUser(email);
	}

	return (
		<>
			<h1>Login</h1>

			<form action="submit" onSubmit={handleSubmit}>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				{/* if not get current user  */}
				<button type="submit"></button>
			</form>
		</>
	);
}
