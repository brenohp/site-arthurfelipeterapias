import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// 1. GET: Busca os dados de um post específico
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const postId = Number(resolvedParams.id)
    
    const post = await prisma.post.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return NextResponse.json({ error: "Post não encontrado" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Erro ao buscar post por ID:", error)
    return NextResponse.json({ error: "Erro ao buscar o post" }, { status: 500 })
  }
}

// 2. PUT: Atualiza os dados de um post existente
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const postId = Number(resolvedParams.id)
    
    const body = await request.json()
    const { titulo, resumo, conteudo, slug, urlMidia, urlVideo, publicado } = body

    const postAtualizado = await prisma.post.update({
      where: { id: postId },
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

    return NextResponse.json(postAtualizado)
  } catch (error) {
    console.error("Erro ao atualizar o post:", error)
    return NextResponse.json({ error: "Erro ao atualizar o post" }, { status: 500 })
  }
}

// 3. DELETE: Exclui um post do banco de dados
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const postId = Number(resolvedParams.id)

    await prisma.post.delete({
      where: { id: postId }
    })

    return NextResponse.json({ message: "Post deletado com sucesso!" })
  } catch (error) {
    console.error("Erro ao deletar post:", error)
    return NextResponse.json({ error: "Erro ao deletar o post" }, { status: 500 })
  }
}