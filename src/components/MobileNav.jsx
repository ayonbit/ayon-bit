"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
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
    <div className="">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            aria-label="Open navigation menu"
            className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-md"
          >
            <CiMenuFries className="text-[32px] text-accent" />
          </button>
        </SheetTrigger>

        <SheetContent className="flex flex-col w-full sm:max-w-sm">
          {/* Add SheetDescription for accessibility */}
          <SheetDescription className="sr-only">
            Main navigation menu
          </SheetDescription>

          <SheetTitle className="mt-8 sm:mt-12 mb-12 sm:mb-20 text-center">
            <SheetClose asChild>
              <Link
                href="/"
                className="text-3xl sm:text-4xl font-semibold text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-md"
              >
                Ayon Bit<span className="text-accent">.</span>
              </Link>
            </SheetClose>
          </SheetTitle>

          <nav className="flex flex-col items-center gap-6 sm:gap-8">
            {links.map((link) => (
              <SheetClose key={link.path} asChild>
                <Link
                  href={link.path}
                  className={`text-lg sm:text-xl capitalize focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-md px-2 ${
                    pathname === link.path
                      ? "text-accent border-b-2 border-accent"
                      : ""
                  }`}
                  aria-current={pathname === link.path ? "page" : undefined}
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
                    className={`text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-md px-2 ${
                      pathname === "/write"
                        ? "text-accent border-b-2 border-accent"
                        : ""
                    }`}
                    aria-current={pathname === "/write" ? "page" : undefined}
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
                    className="text-lg sm:text-xl capitalize focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-md px-2"
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
                  className="text-lg sm:text-xl capitalize focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-md px-2"
                >
                  Sign In
                </Link>
              </SheetClose>
            ) : (
              <div className="w-20 h-5 rounded bg-gray-200 animate-pulse" />
            )}

            <SheetClose asChild>
              <Button asChild variant="outline" className="mt-4">
                <Link
                  href="https://upwork.com/freelancers/~013d3ec6c65c896873"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                >
                  Hire Me
                </Link>
              </Button>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
