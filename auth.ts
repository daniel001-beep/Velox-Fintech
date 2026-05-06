import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/src/db";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      // Grant admin rights if the email matches the environment variable
      if (token.email && process.env.ADMIN_EMAIL && token.email === process.env.ADMIN_EMAIL) {
        token.isAdmin = true;
      }
      return token;
    },
    session: ({ session, token }: any) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});
