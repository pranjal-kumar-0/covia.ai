"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  OrganizationSwitcher,
  useAuth,
} from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { getToken } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopyToken = async () => {
    const token = await getToken();
    if (token) {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <Show when="signed-in">
          <OrganizationSwitcher />
          <UserButton />
        </Show>
      </header>

      <div className="flex flex-col items-center justify-center flex-1 gap-8">
        <h1 className="text-6xl font-bold tracking-tight">covia.ai</h1>

        <Show when="signed-out">
          <div className="flex gap-4">
            <SignInButton>Sign In</SignInButton>
            <SignUpButton>Sign Up</SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-3 font-medium text-white bg-black rounded-full hover:bg-gray-800"
            >
              Go to Dashboard
            </Link>

            <button
              onClick={handleCopyToken}
              className="px-6 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              {copied ? "Copied to Clipboard!" : "Copy Bearer Token"}
            </button>
          </div>
        </Show>
      </div>
    </main>
  );
}