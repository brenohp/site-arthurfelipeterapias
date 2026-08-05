import Link from 'next/link'
import { FaImage, FaPlay } from 'react-icons/fa'
import { PrismaClient } from '@prisma/client'

// Impede que o Next.js guarde cache estático antigo
export const revalidate = 0; 

export default async function Blog() {
  const prisma = new PrismaClient()

  // Busca os posts onde o tipo é 'blog' OU 'video', garantindo que nada suma
  const posts = await prisma.post.findMany({
    where: { 
      tipo: {
        in: ['blog', 'video']
      },
      publicado: true 
    },
    orderBy: { 
      createdAt: 'desc' 
    }
  });

  // Função robusta para capturar a miniatura do YouTube
  const getYouTubeThumbnail = (url: string | null) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
    }
    
    return null;
  };

  return (
    <main className="max-w-6xl mx-auto p-6 pt-10 md:pt-16 pb-16">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-black">
          Nosso <span className="text-brand-red">Blog</span>
        </h1>
        <p className="mt-4 text-lg text-brand-black/80 max-w-2xl mx-auto">
          Acompanhe nossos casos de sucesso, artigos sobre terapias, pesquisas e dicas para o seu bem-estar.
        </p>
      </div>

      {/* Grid de Posts com Thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {posts.map(post => {
          const ytThumb = getYouTubeThumbnail(post.urlVideo);
          const imagemFinal = post.urlMidia || ytThumb;

          return (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-black/5">
              
              {/* Área da Thumbnail (Capa ou Vídeo) */}
              <div className="w-full aspect-video bg-brand-black/5 relative flex items-center justify-center border-b border-black/5 overflow-hidden">
                {imagemFinal ? (
                  <>
                    <img 
                      src={imagemFinal} 
                      alt={post.titulo} 
                      className="w-full h-full object-cover" 
                    />
                    {post.urlVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg">
                          <FaPlay className="ml-1" />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-brand-black/30 flex flex-col items-center">
                    <FaImage className="text-5xl mb-2" />
                    <span className="text-sm font-medium">Foto de Capa</span>
                  </div>
                )}
              </div>

              {/* Conteúdo do Post */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs text-brand-red font-bold tracking-wider uppercase mb-2">
                  {new Date(post.createdAt).toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <h2 className="text-xl font-bold text-brand-black mb-3 leading-tight line-clamp-2">
                  {post.titulo}
                </h2>
                <p className="text-brand-black/70 mb-6 flex-grow text-sm line-clamp-3">
                  {post.resumo}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-brand-red font-bold hover:text-brand-black transition-colors inline-flex items-center gap-2 mt-auto"
                >
                  Ler artigo <span>&rarr;</span>
                </Link>
              </div>

            </article>
          );
        })}

        {/* Mensagem caso não tenha nenhum post ainda */}
        {posts.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 text-lg">
            Nenhum artigo publicado ainda. Volte em breve para novidades!
          </div>
        )}

      </div>

    </main>
  )
}