/**
 * The axios library is used to make HTTP requests.
 * @external Axios
 * @see {@link https://github.com/axios/axios}
 */
import axios from "axios";

/**
 * The module for configuring and using NextAuth.js.
 * @external NextAuth
 * @see {@link https://next-auth.js.org/}
 */
import { NextAuthOptions, getServerSession } from "next-auth";

/**
 * The module for using the Credentials provider with NextAuth.js.
 * @external CredentialsProvider
 * @see {@link https://next-auth.js.org/providers/credentials}
 */
import CredentialsProvider from "next-auth/providers/credentials";


/**
 * Options for configuring the NextAuth authentication.
 */
export const authOptions: NextAuthOptions = {
  // Specify the session strategy to use
  session: {
    strategy: "jwt",
  },
  // Define the authentication providers
  providers: [
    // Credentials provider for username and password authentication
    CredentialsProvider({
      name: "Credentials",
      // Define the credentials fields
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // Authorization logic for the credentials
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as any;
          if (!email || !password) {
            throw new Error(
              "Invalid credentials. Please provide a username and password."
            );
          }

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              email,
              password,
            }
          );

          if (res.status === 200) {
            const user = await res.data;
            if (user) {
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
  // Callbacks for customizing the authentication flow
  callbacks: {
    // Customize the JWT token
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },
    // Customize the session object
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  // Customize the pages for authentication
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
};

/**
 * Get the authentication session.
 * @returns The server session.
 */
export const getAuthSession = () => getServerSession(authOptions);

