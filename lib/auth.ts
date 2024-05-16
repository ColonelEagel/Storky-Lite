import { User } from "@/types/interface";
import axios from "axios";
import { NextAuthOptions,  getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// declare module "next-auth" {
//   interface Session {
//     user: User
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT {
//     isAdmin: Boolean;
//   }
// }

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Add logic here to look up the user from the credentials supplied
          const { email, password } = credentials as any;
          console.log(credentials);
          console.log(email, password);
          if (!email || !password) {
            throw new Error(
              "Invalid credentials. Please provide a username and password."
            );
          }

          const res = await axios.post(
            `${process.env.BACKEND_URL}/auth/login`,
            {
              email,
              password,
            }
          );

          if (res.status === 200) {
            const user = await res.data;
            if (user) {
              console.log(user);
              return user;
            } else {
              throw new Error("User not found");
            }
          } else {
            throw new Error(
              "Authentication failed with status code: " + res.status
            );
          }
        } catch (error) {
          console.error("An error occurred during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
export const getAuthSession = () => getServerSession(authOptions);
