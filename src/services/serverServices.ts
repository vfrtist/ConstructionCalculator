"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createNewUser } from "./userServices";
import { cache } from "react";

export async function serverClient() {
	const cookieStore = await cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet, headers) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options),
						);
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
}

export const fetchCurrentUserID = cache(async () => {
	const client = await serverClient();
	const { data: claims } = await client.auth.getClaims();
	return claims?.claims.sub;
});

export async function signUp(email: string, password: string) {
	const client = await serverClient();

	const { data, error } = await client.auth.signUp({
		email,
		password,
	});

	if (error) {
		console.error(error.message);
		return false;
	}

	if (data.user) {
		await createNewUser(data.user.id, email);
	}
	return true;
}

export async function guestSignIn() {
	const email = process.env.GUEST_EMAIL;
	const password = process.env.GUEST_PASSWORD;

	if (!email || !password) {
		throw new Error("Guest credentials not found");
	}

	const client = await serverClient();

	const { error } = await client.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error(error.message);
		return false;
	}
	return true;
}
