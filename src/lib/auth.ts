import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { getOrCreateUser, getUserByEmail } from "./userManager"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false
      
      try {
        const dbUser = await getOrCreateUser({
          email: user.email,
          name: user.name || profile?.name,
          image: user.image || profile?.picture,
          provider: account?.provider || 'google',
          provider_id: account?.providerAccountId || user.id,
        })

        return !!dbUser // Convert to boolean
      } catch (error) {
        console.error('SignIn callback error:', error)
        return false
      }
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      
      if (user?.email) {
        // Get the database user ID
        try {
          const dbUser = await getUserByEmail(user.email)
          if (dbUser) {
            token.dbUserId = dbUser.id
          }
        } catch (error) {
          console.error('Error fetching user ID:', error)
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string
        session.user.id = token.dbUserId as string || token.sub as string
        session.provider = token.provider as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/dashboards`
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
}) 