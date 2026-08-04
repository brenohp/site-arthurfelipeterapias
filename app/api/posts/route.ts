import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET: Retorna TODOS os posts para o painel administrativo (sem filtros restritivos)
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    return NextResponse.json({ error: "Erro ao buscar os posts" }, { status: 500 })
  }
}

// POST: Cria um novo post
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
        tipo: urlVideo ? 'video' : 'blog',
        urlMidia,
        urlVideo,
        publicado: publicado ?? true
      }
    })

    return NextResponse.json(novoPost, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar post:", error)
    return NextResponse.json({ error: "Erro ao criar o post" }, { status: 500 })
  }
}