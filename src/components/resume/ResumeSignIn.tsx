"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { KeyRound, Loader2 } from "lucide-react";
import { apiFetchError } from "@/lib/client-api";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ResumeSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setError(await apiFetchError(response, "Sign-in failed."));
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="panel w-full max-w-md p-7 sm:p-9">
      <span className="grid size-12 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan">
        <KeyRound className="size-5" />
      </span>
      <h1 className="display mt-6 text-3xl">Owner sign-in</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Authentication is required. Public registration is not offered; only explicitly allowlisted accounts can manage resumes.
      </p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Email</span>
          <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="field mt-2" placeholder="owner@example.com" />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Password</span>
          <input type="password" autoComplete="current-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className="field mt-2" placeholder="••••••••" />
        </label>
        {error && <p role="alert" className="rounded-lg border border-red-400/25 bg-red-400/[0.07] p-3 text-xs text-red-200">{error}</p>}
        <MagneticButton type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Signing in…" : "Sign in securely"}
        </MagneticButton>
      </form>

      <p className="mt-6 text-[11px] leading-relaxed text-dim">
        Sessions use secure, SameSite cookies. Failed attempts are rate-limited.
      </p>
    </motion.div>
  );
}
