import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// Função para BUSCAR todos os artigos do blog
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { tipo: 'blog' }, // Busca apenas o que for do blog
      orderBy: { createdAt: 'desc' } // Mostra os mais recentes primeiro
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar os posts" }, { status: 500 })
  }
}

// Função para CRIAR um novo artigo
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { titulo, resumo, conteudo, slug, urlMidia, publicado } = body

    const novoPost = await prisma.post.create({
      data: {
        titulo,
        resumo,
        conteudo,
        slug,
        tipo: 'blog', // Cravamos o tipo como blog automaticamente
        urlMidia,
        publicado: publicado ?? true
      }
    })

    return NextResponse.json(novoPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar o post" }, { status: 500 })
  }
}