"use client";
import { fetchUserExists, signIn, signUp } from "@/Services/userServices";
import { useState } from "react";
import "@/Stylings/login.css";
import ThemeButton from "@/UI/Generic/ThemeButton";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userExists, setExists] = useState<null | boolean>(null);
	const captions = {
		["null"]: "Signup/Login",
		["true"]: "Login",
		["false"]: "Signup",
	};
	async function handleSubmit() {
		switch (userExists) {
			case null:
				setExists(await fetchUserExists(email));
				break;

			case true:
				signIn(email, password);
				break;

			case false:
				signUp(email, password);
				break;
		}
	}

	// 1) on loading check if user exists.
	// 2) on checking, refresh the handle to either login or sign up
	return (
		<>
			<h1>Login</h1>

			<form
				id="LoginForm"
				className="container vertical"
				action="submit"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					placeholder="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				{userExists != null && (
					<input
						type="password"
						name="password"
						id="password"
						placeholder="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				)}
				<ThemeButton type="submit">
					{captions[`${userExists}`]}
				</ThemeButton>
			</form>
		</>
	);
}
