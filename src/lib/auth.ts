import { MovieService } from "@/service/MovieService";
import { LoginRequest } from "@/types/Movie";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.");
        }

        const data: LoginRequest = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await MovieService.LoginService(data);

        if (res?.payload?.token) {
          return {
            id: res.payload.token,
          };
        }
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },

    async session({ session, token }) {
      session.token = token.id as string;
      return session;
    },
  },
};
