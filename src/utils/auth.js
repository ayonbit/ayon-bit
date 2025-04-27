import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./server";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "database",
    maxAge: 6 * 60 * 60,
    updateAge: 1 * 60 * 60,
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user?.id) {
        session.user.id = user.id;

        session.user.role = "user"; //if needed else no use
      }
      return session;
    },
  },
  events: {
    async signOut({ session }) {
      await prisma.session.deleteMany({
        where: {
          expires: { lt: new Date() },
        },
      });
    },
  },
};
