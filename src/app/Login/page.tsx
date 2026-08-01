"use client";
import { fetchUserExists } from "@/services/userServices";
import { signUp } from "@/services/serverServices";
import { signIn } from "@/services/browserServices";
import { useState } from "react";
import "@/Stylings/login.css";
import ThemeButton from "@/ui/Generic/ThemeButton";
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

		if (!email) return; // Should redirect to "please fill in email"
		if (userExists == null) {
			setExists(await fetchUserExists(email));
			return;
		}

		const password = formData.get("password")?.toString();
		if (!password) return; // Should redirect to "please fill in password"

		if (!userExists) {
			if (!(await signUp(email, password))) return;
			setExists(true);
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
