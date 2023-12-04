import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/User";
import { compare } from "bcrypt";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    //add credentials provider
    //authorize method
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials){
        //connect to the DB mongodb
        //find user with the email
        //email does not exist
        //check password
        //incorrect...
        //user
        await dbConnect();

        // Find user with the email
        const user = await User.findOne({
          email: credentials?.email,
        });

        // Email Not found
        if (!user) {
          throw new Error("Email is not registered");
        }

        // Check hashed password with DB hashed password
        const isPasswordCorrect = await compare(
          credentials!.password,
          user.hashedPassword
        );

        // Incorrect password
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect");
        }

        return user;
      }

    }),

  ],

  // pages: {
  //   signIn: "/auth",
  // },
  
  //debugging process that sends data in console
  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt"},
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});