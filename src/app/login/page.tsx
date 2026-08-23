"use client";
import { fetchUserExists } from "@/services/userServices";
import { signUp, guestSignIn } from "@/services/serverServices";
import { signIn } from "@/services/browserServices";
import { useState } from "react";
import "@/styles/login.css";
import ThemeButton from "@/ui/Generic/ThemeButton";
import { redirect } from "next/navigation";
import Icon from "@/ui/Generic/Icon";

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

		if (!email) return; // Should show "please fill in email"
		if (userExists == null) {
			setExists(await fetchUserExists(email));
			return;
		}

		const password = formData.get("password")?.toString();
		if (!password) return; // Should show "please fill in password"

		if (!userExists) {
			if (!(await signUp(email, password))) return;
			setExists(true);
		}

		if (await signIn(email, password)) redirect("/manager");
	}

	return (
		<main>
			<div className="loginWrapper">
				<div className="upper">
					<Icon iconKey="logoFull" />
				</div>
				<Icon iconKey="wave" />

				<form
					id="LoginForm"
					className="container vertical"
					action="submit"
					onSubmit={handleSubmit}
				>
					<div className="formRow">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Please enter email"
						/>
					</div>
					{userExists != null && (
						<div className="formRow">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="password"
							/>
						</div>
					)}
					<div className="buttonWrapper container vertical">
						<ThemeButton type="submit">
							{captions[`${userExists}`]}
						</ThemeButton>

						<button
							id="guestLogin"
							type="button"
							onClick={async () => {
								if (await guestSignIn()) redirect("/manager");
							}}
						>
							Continue as Guest
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
