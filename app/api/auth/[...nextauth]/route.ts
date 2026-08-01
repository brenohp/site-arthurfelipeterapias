import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Dados inválidos");
        }

        // 1. Busca o usuário no banco de dados
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        // 2. Compara a senha digitada com a senha criptografada do banco
        const senhaValida = await bcrypt.compare(credentials.password, user.senha);

        if (!senhaValida) {
          throw new Error("Senha incorreta");
        }

        // 3. Retorna os dados se tudo der certo
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  pages: {
    signIn: '/login', // Dizemos ao sistema qual será a nossa página visual de login
  },
  session: {
    strategy: "jwt", // Usa tokens super rápidos e seguros
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };