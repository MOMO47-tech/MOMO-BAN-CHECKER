import { describe, expect, it } from "vitest";

describe("Supabase members connection", () => {
  it("can read the RLS-protected members endpoint with the publishable key", async () => {
    const baseUrl = process.env.VITE_SUPABASE_URL;
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
    expect(baseUrl, "VITE_SUPABASE_URL is required").toBeTruthy();
    expect(anonKey, "VITE_SUPABASE_ANON_KEY is required").toBeTruthy();

    const response = await fetch(
      `${baseUrl}/rest/v1/momo_ban_members?select=display_name&limit=1`,
      {
        headers: {
          apikey: anonKey!,
          Authorization: `Bearer ${anonKey}`,
        },
      }
    );

    expect(response.status).toBe(200);
    const payload = (await response.json()) as unknown;
    expect(Array.isArray(payload)).toBe(true);
  }, 15_000);
});
