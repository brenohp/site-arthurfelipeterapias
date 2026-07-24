import Link from 'next/link'
import { FaImage, FaPlayCircle } from 'react-icons/fa'

export default function Blog() {
  // Dados de teste atualizados com o "tipo" de mídia
  const posts = [
    {
      id: 1,
      titulo: "Os benefícios do Seitai para dores crônicas",
      resumo: "Entenda como essa técnica milenar japonesa pode ajudar a devolver a mobilidade e qualidade de vida corrigindo a estrutura corporal.",
      data: "18 de Julho de 2026",
      slug: "beneficios-do-seitai",
      tipo: "foto" // Simula que este post tem uma imagem de capa
    },
    {
      id: 2,
      titulo: "Como prevenir o esporão de calcâneo na rotina",
      resumo: "Dicas práticas, alongamentos e exercícios simples para evitar essa dor incômoda que afeta tantas pessoas no dia a dia.",
      data: "10 de Julho de 2026",
      slug: "como-prevenir-esporao",
      tipo: "video" // Simula que este post é um vídeo (ex: Reels do Instagram)
    }
  ]

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
        {posts.map(post => (
          <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-black/5">
            
            {/* Área da Thumbnail (Capa) */}
            <div className="w-full aspect-video bg-brand-black/5 relative flex items-center justify-center border-b border-black/5">
              {post.tipo === 'video' ? (
                <div className="text-center text-brand-red/60 flex flex-col items-center">
                  <FaPlayCircle className="text-5xl mb-2" />
                  <span className="text-sm font-medium">Capa do Vídeo</span>
                </div>
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
                {post.data}
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
                {post.tipo === 'video' ? 'Assistir agora' : 'Ler artigo'} <span>&rarr;</span>
              </Link>
            </div>

          </article>
        ))}
      </div>

    </main>
  )
}