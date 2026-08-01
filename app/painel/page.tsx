import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaVideo, FaImage, FaNewspaper } from 'react-icons/fa'

// Esta é uma página de servidor (Server Component). 
// Mais tarde, vamos puxar os posts reais do banco de dados aqui.
export default function PainelDashboard() {
  
  // Dados simulados para visualizarmos a interface unificada
  const postsFicticios = [
    { id: 1, titulo: 'Como cuidar da postura no trabalho', tipo: 'artigo', data: '25/07/2026', status: 'Publicado' },
    { id: 2, titulo: 'Ajuste de cervical (Antes e Depois)', tipo: 'video', data: '20/07/2026', status: 'Publicado' },
    { id: 3, titulo: 'Aviso: Estaremos fechados no feriado', tipo: 'aviso', data: '18/07/2026', status: 'Rascunho' },
    { id: 4, titulo: 'Tratamento de esporão de calcâneo', tipo: 'foto', data: '10/07/2026', status: 'Publicado' },
  ]

  // Função simples para retornar o ícone correto dependendo do tipo do post
  const renderIcone = (tipo: string) => {
    switch (tipo) {
      case 'video': return <FaVideo className="text-blue-500" title="Vídeo" />
      case 'foto': return <FaImage className="text-purple-500" title="Foto com texto" />
      case 'aviso': return <FaNewspaper className="text-yellow-600" title="Aviso" />
      default: return <FaNewspaper className="text-brand-red" title="Artigo" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho do Painel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-black">Gerenciamento de Posts</h1>
            <p className="text-gray-600 mt-1">Crie e administre seus vídeos, fotos, avisos e artigos.</p>
          </div>
          <Link 
            href="/painel/novo-post" 
            className="bg-brand-red text-white px-6 py-3 rounded-md font-bold hover:bg-red-800 transition-colors flex items-center gap-2 shadow-md w-fit"
          >
            <FaPlus /> Novo Post
          </Link>
        </div>

        {/* Tabela/Lista de Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Tipo</th>
                  <th className="p-4 font-semibold">Título do Post</th>
                  <th className="p-4 font-semibold">Data</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {postsFicticios.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                        {renderIcone(post.tipo)}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-brand-black">
                      {post.titulo}
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {post.data}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        post.status === 'Publicado' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors p-2" title="Editar">
                        <FaEdit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition-colors p-2" title="Excluir">
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {postsFicticios.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              Nenhum post encontrado. Clique em "Novo Post" para começar!
            </div>
          )}
        </div>

      </div>
    </div>
  )
}