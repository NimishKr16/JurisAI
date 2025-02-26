"use client";

import { SignOutButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the App!</h1>
      <SignOutButton>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  );
}