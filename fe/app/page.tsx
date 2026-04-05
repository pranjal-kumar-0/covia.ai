import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
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
            <SignInButton>
                Sign In
            </SignInButton>

            <SignUpButton>
                Sign Up
            </SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <Link
            href="/dashboard"
            className="px-8 py-3 font-medium text-white bg-black rounded-full hover:bg-gray-800"
          >
            Go to Dashboard
          </Link>
        </Show>
      </div>
    </main>
  );
}