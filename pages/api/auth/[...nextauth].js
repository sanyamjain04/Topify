import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_APP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_APP_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.tag = session?.user?.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
  
      session.user.uid = token.sub
      return session;
    },
  },
  secret: process.env.NEXTAUTH_URL
});
