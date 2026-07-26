import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import postgres from "postgres";

export const browserCall = createBrowserClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_ANON_KEY!,
);

export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll() {
					// Server Components don't write cookies.
				},
			},
		},
	);
}
export const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });
