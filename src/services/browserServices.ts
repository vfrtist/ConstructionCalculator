"use client";

import { createBrowserClient } from "@supabase/ssr";

export function browserClient() {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
	);
}

export async function signIn(email: string, password: string) {
	const { error } = await browserClient().auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error(error.message);
		return false;
	}
	return true;
}

export async function signOut() {
	const { error } = await browserClient().auth.signOut();
	if (error) {
		console.error(error.message);
		return false;
	}
	return true;
}
