"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/write");
    }
  }, [status, router]);

  // if (status === "loading") {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-[#1c1c22] text-white">
  //       <div className="flex items-center space-x-2">
  //         <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
  //         <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-100"></div>
  //         <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-200"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container p-12  flex items-center justify-center bg-primary">
      <motion.div
        whileHover={{ y: -8 }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
        }}
        className={"w-full max-w-md mx-auto "}
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/10">
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm sm:text-base text-white/60">
                Sign in to post articles and manage your blog.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Button
                onClick={() => signIn("google")}
                className="flex items-center justify-center gap-3 w-full transition-all font-medium py-3 px-4 rounded-lg shadow-sm bg-accent hover:bg-white/90  text-sm sm:text-base"
              >
                <FcGoogle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Continue with Google</span>
              </Button>
              {/* 
              <Button
                onClick={() => signIn("github")}
                className="flex items-center justify-center gap-3 w-full transition-all font-medium py-3 px-4 rounded-lg shadow-sm bg-accent hover:bg-white/90 text-sm sm:text-base"
              >
                <FaGithub className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Continue with GitHub</span>
              </Button> */}

              {/* <Button
                onClick={() => signIn("facebook")}
                className="flex items-center justify-center gap-3 w-full transition-all font-medium py-3 px-4 rounded-lg shadow-sm bg-accent hover:bg-white/90  text-sm sm:text-base"
              >
                <FaFacebook className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Continue with Facebook</span>
              </Button> */}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-[#1c1c22] text-xs sm:text-sm text-white/50">
                  OR
                </span>
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="link"
                className="text-xs sm:text-sm text-white/60 hover:text-accent focus:ring-0"
              >
                Continue with Email (Coming Soon)
              </Button>
            </div>
          </div>

          <div className="px-6 py-4 bg-white/5 border-t border-white/10 text-center">
            <p className="text-xs sm:text-sm text-white/50">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-white">
                terms & conditions
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
