'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaNewspaper } from 'react-icons/fa'

type Post = {
  id: number
  titulo: string
  createdAt: string
  publicado: boolean
}

export default function BlogListagemPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregarPosts() {
      try {
        const res = await fetch('/api/posts')
        if (res.ok) {
          const dados = await res.json()
          setPosts(dados)
        }
      } catch (error) {
        console.error("Erro ao buscar posts:", error)
      } finally {
        setCarregando(false)
      }
    }
    carregarPosts()
  }, [])

  // Função para deletar um post
  const handleExcluir = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este artigo? Essa ação não pode ser desfeita.")) {
      return
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
      
      if (res.ok) {
        setPosts(posts.filter(post => post.id !== id))
        alert("Post excluído com sucesso!")
      } else {
        alert("Erro ao excluir o post.")
      }
    } catch (error) {
      alert("Erro de conexão ao tentar excluir.")
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-black">Conteúdos Publicados</h1>
          <p className="text-gray-600 mt-1">Gerencie os artigos do blog do seu site.</p>
        </div>
        <Link 
          href="/painel/blog/novo" 
          className="bg-brand-red text-white px-6 py-3 rounded-md font-bold hover:bg-red-800 transition-colors flex items-center gap-2 shadow-md w-fit"
        >
          <FaPlus /> Novo Post
        </Link>
      </div>

      {/* Tabela de Posts */}
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
              
              {carregando ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">Carregando posts...</td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">Nenhum post encontrado. Clique em "Novo Post" para começar!</td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-brand-red mx-auto">
                        <FaNewspaper title="Artigo do Blog" />
                      </div>
                    </td>
                    <td className="p-4 font-medium text-brand-black">
                      {post.titulo}
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        post.publicado 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.publicado ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    
                    {/* Coluna Ações Corrigida e Alinhada */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botão de editar */}
                        <Link 
                          href={`/painel/blog/editar/${post.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center" 
                          title="Editar"
                        >
                          <FaEdit size={18} />
                        </Link>
                        
                        {/* Botão de excluir */}
                        <button 
                          onClick={() => handleExcluir(post.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center" 
                          title="Excluir"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}