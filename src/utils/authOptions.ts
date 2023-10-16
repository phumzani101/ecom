import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongodbConnect from "@/utils/mongodbConnect";
import UserModel from "@/models/UserModel";
import config from "@/config";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
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
  secret: config.nextauthSecret,
  pages: { signIn: "/signin" },
};
