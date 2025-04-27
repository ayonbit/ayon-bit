"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Open menu">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetTitle className="mt-32 mb-40 text-center">
          <SheetClose asChild>
            <Link href="/" className="text-4xl font-semibold text-white">
              Ayon Bit<span className="text-accent">.</span>
            </Link>
          </SheetClose>
        </SheetTitle>

        <nav className="flex flex-col items-center gap-8">
          {links.map((link) => (
            <SheetClose key={link.path} asChild>
              <Link
                href={link.path}
                className={`text-xl capitalize ${
                  pathname === link.path
                    ? "text-accent border-b-2 border-accent"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </SheetClose>
          ))}

          {status === "authenticated" ? (
            <>
              <SheetClose asChild>
                <Link
                  href="/write"
                  className={`text-xl ${
                    pathname === "/write"
                      ? "text-accent border-b-2 border-accent"
                      : ""
                  }`}
                >
                  Write Post
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-xl capitalize"
                >
                  Log Out
                </button>
              </SheetClose>
            </>
          ) : status === "unauthenticated" ? (
            <SheetClose asChild>
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="text-xl capitalize"
              >
                Sign In
              </Link>
            </SheetClose>
          ) : (
            <div className="w-20 h-5 rounded bg-gray-200 animate-pulse" />
          )}

          <SheetClose asChild>
            <Button asChild variant="outline">
              <Link
                href="https://upwork.com/freelancers/~013d3ec6c65c896873"
                target="_blank"
                rel="noopener"
              >
                Hire Me
              </Link>
            </Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
