import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            name: string;
            email: string;
            image: string;
            tag: string
            uid: string
        };
    }

    interface providers {
        0 : {
            callbackUrl: string
            id: string
            name: string
            signinUrl: string
            type: string
        }
    }
}