import { LucideFileQuestion } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="fixed top-0 left-0 bg-white w-full min-h-screen flex flex-col gap-y-3 items-center justify-center">
      <LucideFileQuestion className="w-24 h-24 text-gray-500 animate-pulse" />

      <h2 className="text-4xl font-bold">404 - Page Not Found</h2>
      <p className="text-lg font-semibold text-gray-600 ">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link
        href={"/"}
        className="bg-black text-white rounded-full px-4 py-2 hover:scale-110
     duration-300 ease-in-out text-base font-semibold"
      >
        Go back home
      </Link>
    </div>
  );
}
