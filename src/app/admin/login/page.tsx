"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid password");
      }

      // Redirect to admin or original destination
      const redirect = searchParams.get("redirect") || "/admin";
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full bg-white p-8 shadow-lg">
      <h1 className="font-oswald text-2xl font-bold uppercase text-[#8b0000] mb-6 text-center">
        Admin Login
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 font-oswald font-medium uppercase tracking-wide text-sm text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 text-base focus:outline-none focus:border-[#8b0000] transition-colors"
            placeholder="Enter admin password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#8b0000] text-white py-4 font-oswald text-lg font-bold uppercase tracking-wider hover:bg-[#a00] transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
