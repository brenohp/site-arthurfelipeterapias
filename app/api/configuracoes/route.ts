import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    let config = await prisma.configuracaoSite.findFirst()
    
    if (!config) {
      config = await prisma.configuracaoSite.create({ data: {} })
    }
    
    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar configurações" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    // Agora recebemos também as URLs das fotos!
    const { mensagemHeader, horarioHeader, fotoHeroUrl, fotoSobreUrl } = body

    const configAtualizada = await prisma.configuracaoSite.update({
      where: { id: 1 },
      data: {
        mensagemHeader,
        horarioHeader,
        fotoHeroUrl,
        fotoSobreUrl,
      }
    })

    return NextResponse.json(configAtualizada)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar configurações" }, { status: 500 })
  }
}