"use client";
import { fetchUserExists, signUp } from "@/Services/userServices";
import { signIn } from "@/Services/browserServices";
import { useState } from "react";
import "@/Stylings/login.css";
import ThemeButton from "@/UI/Generic/ThemeButton";
import { redirect } from "next/navigation";

export default function Login() {
	const [userExists, setExists] = useState<null | boolean>(null);
	const captions = {
		["null"]: "Signup/Login",
		["true"]: "Login",
		["false"]: "Signup",
	};

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		if (!email) return; // Should redirect to "please fill in email"
		if (userExists == null) {
			setExists(await fetchUserExists(email));
			return;
		}

		if (!password) return; // Should redirect to "please fill in passwword"
		if (!userExists) {
			setExists(await signUp(email, password));
			return;
		}

		if (await signIn(email, password)) redirect("/manager");
	}

	return (
		<>
			<h1>Login</h1>

			<form
				id="LoginForm"
				className="container vertical"
				action="submit"
				onSubmit={handleSubmit}
			>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="email"
				/>
				{userExists != null && (
					<input
						type="password"
						name="password"
						id="password"
						placeholder="password"
					/>
				)}
				<ThemeButton type="submit">
					{captions[`${userExists}`]}
				</ThemeButton>
			</form>
		</>
	);
}
