import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/login', // Força o redirecionamento para a nossa tela visual
  }
})

export const config = {
  matcher: ["/painel/:path*"]
}