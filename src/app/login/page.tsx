"use server";

import "@/styles/login.css";
import LoginBody from "@/ui/Login/LoginBody";

interface LoginPageProps {
	searchParams: Promise<{
		returnTo?: string;
	}>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
	const { returnTo } = await searchParams;

	return <LoginBody returnTo={returnTo ?? "/manager"} />;
}
