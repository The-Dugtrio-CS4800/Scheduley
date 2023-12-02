import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb";
import dbConnect from "../../../../lib/dbConnect";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  // pages: {
  //   signIn: "/auth",
  // },
  
  //debugging process that sends data in console
  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
});