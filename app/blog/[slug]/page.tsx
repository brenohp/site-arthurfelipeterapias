import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { FaArrowLeft } from 'react-icons/fa'


// Essa função avisa ao Google qual é o título e o resumo do post específico
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const prisma = new PrismaClient()
  
  const post = await prisma.post.findUnique({
    where: { slug: resolvedParams.slug }
  })

  if (!post) {
    return { title: 'Post não encontrado' }
  }

  return {
    title: `${post.titulo} | Arthur Massoterapeuta`,
    description: post.resumo,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const prisma = new PrismaClient()

  // Busca no banco de dados o post que tem o exato slug da URL
  const post = await prisma.post.findUnique({
    where: { 
      slug: resolvedParams.slug 
    }
  })

  // Se o post não existir ou for um rascunho (não publicado), mostra a página 404 de erro
  if (!post || !post.publicado) {
    notFound()
  }

  // Função auxiliar para converter o link do YouTube em formato Embed
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  }

  const embedUrl = post.urlVideo ? getYouTubeEmbedUrl(post.urlVideo) : null;

  return (
    <main className="max-w-4xl mx-auto p-6 pt-10 md:pt-16 pb-16">
      
      {/* Botão de Voltar */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-brand-red font-medium hover:text-red-800 transition-colors mb-8">
        <FaArrowLeft /> Voltar para o Blog
      </Link>

      <article>
        {/* Cabeçalho do Artigo */}
        <header className="mb-10 text-center">
          <span className="text-sm font-bold text-brand-red tracking-widest uppercase mb-4 block">
            {new Date(post.createdAt).toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black leading-tight mb-6">
            {post.titulo}
          </h1>
        </header>

        {/* Player do YouTube (se houver link de vídeo válido) */}
        {embedUrl ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-12 bg-black">
            <iframe 
              src={embedUrl} 
              title={post.titulo}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        ) : (
          /* Imagem de Capa (se houver e não tiver vídeo) */
          post.urlMidia && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-12">
              <img 
                src={post.urlMidia} 
                alt={post.titulo} 
                className="w-full h-full object-cover" 
              />
            </div>
          )
        )}

        {/* Conteúdo do Texto */}
        <div className="text-brand-black/80 text-lg leading-relaxed whitespace-pre-wrap">
          {post.conteudo}
        </div>
      </article>

    </main>
  )
}