import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// Função para BUSCAR todos os artigos do blog
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { tipo: 'blog' },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar os posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { titulo, resumo, conteudo, slug, urlMidia, urlVideo, publicado } = body

    const novoPost = await prisma.post.create({
      data: {
        titulo,
        resumo,
        conteudo,
        slug,
        tipo: 'blog',
        urlMidia,
        urlVideo, // <--- Isto precisa estar aqui para o link ir para o banco!
        publicado: publicado ?? true
      }
    })

    return NextResponse.json(novoPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar o post" }, { status: 500 })
  }
}