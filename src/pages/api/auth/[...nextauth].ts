import NextAuth from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'

export const authOptions: any = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30일
  },
  callbacks: {
    jwt: async ({ token, user }: any) =>
      user
        ? {
            ...token,
            user: { id: user.id, name: user.name, image: user.image },
          }
        : token,
    session: async ({ session, token }: any) => ({
      ...session,
      user: token.user,
    }),
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
