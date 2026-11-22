"use client";

import { useState } from "react";
import { KeyRound, Loader2, LockKeyhole } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { apiFetchError } from "@/lib/client-api";

export default function ResumeSignIn() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError(await apiFetchError(response, "Sign-in failed."));
        return;
      }
      setPassword("");
      window.location.reload();
    } catch {
      setError("Network error. Please retry.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel max-w-xl p-7 sm:p-9">
      <span className="grid size-12 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan">
        <LockKeyhole className="size-5" />
      </span>
      <h1 className="display mt-6 text-3xl sm:text-4xl">Owner sign-in</h1>
      <p className="pretty mt-3 text-sm leading-relaxed text-muted">
        This area is private. Enter the administrator password stored as a server-side secret to manage published résumé versions.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-dim">Admin password</span>
          <div className="relative">
            <KeyRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-dim" />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              minLength={1}
              className="field pl-11"
              placeholder="Enter password"
              aria-label="Admin password"
            />
          </div>
        </label>

        {error && (
          <p role="alert" className="rounded-lg border border-red-400/25 bg-red-400/[0.06] p-3 text-xs text-red-200">{error}</p>
        )}

        <MagneticButton type="submit" variant="primary" disabled={busy} className="w-full">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
          {busy ? "Signing in…" : "Unlock resume manager"}
        </MagneticButton>
      </form>

      <p className="mt-6 text-[11px] leading-relaxed text-dim">
        The password is never shipped to the browser or committed to source. Sessions use an HttpOnly, SameSite cookie.
      </p>
    </div>
  );
}
