"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createNewUser } from "./userServices";

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
				setAll(cookiesToSet, _headers) {
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

export async function fetchCurrentUser() {
	const client = await serverClient();
	const {
		data: { user },
	} = await client.auth.getUser();
	return user;
}

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
