"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/service" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Nav = () => {
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <div className="flex items-center gap-8">
      {/* Main Navigation Links */}
      <nav className="flex gap-8">
        {links.map((link, index) => (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transition-all`}
          >
            {link.name}
          </Link>
        ))}

        {/* Authentication Links */}

        {status === "authenticated" && (
          <>
            <Link
              href="/write"
              className={`${
                pathname === "/write" && "text-accent border-b-2 border-accent"
              } capitalize font-medium hover:text-accent transition-all`}
            >
              Write Post
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="capitalize font-medium hover:text-accent transition-all cursor-pointer"
            >
              LogOut
            </button>
          </>
        )}

        {status === "unauthenticated" && (
          <Link
            href="/sign-in"
            className="capitalize font-medium hover:text-accent transition-all cursor-pointer"
          >
            SignIn
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Nav;
