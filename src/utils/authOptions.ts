import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import mongodbConnect from "@/utils/mongodbConnect";
import UserModel from "@/models/UserModel";
import config from "@/config";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await mongodbConnect();
        // Add logic here to look up the user from the credentials supplied

        const user = await UserModel.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.authenticate(credentials?.password)) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await mongodbConnect();
      const { email, name, image } = user;
      let dbUser = await UserModel.findOne({ email });

      if (!dbUser) {
        await UserModel.create({ email, name, image });
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      await mongodbConnect();
      const userByEmail = await UserModel.findOne({ email: token?.email });
      // userByEmail.password = undefined;
      if (userByEmail) {
        userByEmail.password = undefined;
        userByEmail.resetCode = undefined;
        token.user = userByEmail;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      console.log(token?.user!);

      return {
        ...session,
        user: token?.user!,
      };
    },
  },
  secret: config.nextauthSecret,
  pages: { signIn: "/signin" },
};
