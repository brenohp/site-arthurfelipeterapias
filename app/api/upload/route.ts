import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configurando o Cloudinary com as chaves que você colocou no .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    // 1. Recebe o arquivo enviado pelo formulário do painel
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo recebido.' }, { status: 400 })
    }

    // 2. Converte a imagem em um formato que a internet consegue trafegar com segurança (Base64)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`

    // 3. Envia para o Cloudinary e guarda dentro de uma pasta chamada "site_arthur"
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: 'site_arthur',
    })

    // 4. Retorna a URL segura (link) da imagem para o nosso painel
    return NextResponse.json({ url: uploadResponse.secure_url })
    
  } catch (error) {
    console.error('Erro no upload para o Cloudinary:', error)
    return NextResponse.json({ error: 'Falha ao processar o upload.' }, { status: 500 })
  }
}