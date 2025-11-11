"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  const router = useRouter();

  return (
  <main className="relative flex min-h-[calc(100dvh-0px)] items-center justify-center overflow-hidden px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,154,14,0.25),transparent_60%)]" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,186,38,0.25),transparent_60%)]" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,154,14,0.05)_0deg,rgba(255,186,38,0.05)_180deg,transparent_360deg)] blur-3xl" />
      </div>

      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-block rounded-full border border-(--border-primary)/50 bg-gray-50 px-3 py-1 text-xs font-semibold text-secondary dark:bg-gray-900/30">
          Oops! Page not found
        </p>

        <h1 className="mb-4 bg-linear-to-r from-primary to-primary-light bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-7xl">
          404
        </h1>
        <h2 className="mx-auto mb-3 max-w-xl text-balance text-2xl font-semibold text-foreground sm:text-3xl">
          We couldn’t find the page you’re looking for
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-pretty text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
          The link may be broken, or the page may have been moved. Try going back or head to the homepage.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => router.back()} className="bg-transparent text-foreground ring-(--border-primary)/40 hover:ring-2 hover:ring-offset-2 border border-(--border-light)/60 hover:border-(--border-primary)/60">
            <FiArrowLeft aria-hidden className="h-4 w-4" />
            Go back
          </Button>

          <Link href="/" aria-label="Go to homepage">
            <Button className="">
              <FiHome aria-hidden className="h-4 w-4" />
              Go home
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-600 dark:text-gray-300">
          <span className="opacity-80">Looking for something tasty?</span>{" "}
          <Link href="/" className="font-semibold text-primary hover:underline">
            Explore today’s specials
          </Link>
        </div>
      </section>
    </main>
  );
}
