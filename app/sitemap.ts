import { MetadataRoute } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const prisma = new PrismaClient()

  // Define a URL principal do seu site (lembre-se de trocar quando publicar)
  const baseUrl = 'https://arthufelipeterapias.com.br'

  // Busca todos os posts publicados no banco de dados
  const posts = await prisma.post.findMany({
    where: { 
      publicado: true 
    },
    select: { 
      slug: true, 
      updatedAt: true 
    }
  })

  // Transforma os posts no formato que o sitemap exige
  const urlsDosPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly', // Avisa o Google que os posts podem ser atualizados
    priority: 0.8, // Prioridade alta para os artigos
  }))

  // Define as páginas fixas do seu site
  const urlsFixas: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0, // A Home é a página mais importante (prioridade máxima)
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily', // A página do blog muda sempre que tem post novo
      priority: 0.9,
    },
  ]

  // Junta as páginas fixas com as páginas dinâmicas do blog e entrega para o Google
  return [...urlsFixas, ...urlsDosPosts]
}