"use client";

import { useRouter } from "next/navigation";

export default function LoggUtKnapp() {
  const router = useRouter();

  async function loggUt() {
    await fetch("/api/auth/logg-ut", { method: "POST" });
    router.push("/parorende/login");
  }

  return (
    <button
      type="button"
      onClick={loggUt}
      className="text-sm font-medium text-marine-700 underline"
    >
      Logg ut
    </button>
  );
}
