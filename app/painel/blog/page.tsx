'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaNewspaper, FaVideo, FaImage, FaBullhorn } from 'react-icons/fa'

// 1. Atualizamos o type para receber as URLs de vídeo e mídia
type Post = {
  id: number
  titulo: string
  createdAt: string
  publicado: boolean
  urlVideo?: string | null
  urlMidia?: string | null
  tipo?: string
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
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-black">Gerenciamento de Posts</h1>
          <p className="text-gray-600 mt-1">Crie e administre seus vídeos, fotos, avisos e artigos.</p>
        </div>
        <Link 
          href="/painel/blog/novo" 
          className="bg-brand-red text-white px-6 py-3 rounded-md font-bold hover:bg-red-800 transition-colors flex items-center gap-2 shadow-md w-fit"
        >
          <FaPlus /> Novo Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 pl-6 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Título do Post</th>
                <th className="p-4 font-semibold">Data</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right pr-6">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              
              {carregando ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">Carregando posts...</td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">Nenhum post encontrado. Clique em "Novo Post" para começar!</td>
                </tr>
              ) : (
                posts.map((post) => {
                  
                  // 2. Lógica Dinâmica de Ícones e Cores
                  let IconeAtual = FaNewspaper;
                  let estiloBg = "bg-red-50";
                  let estiloIcone = "text-brand-red";

                  if (post.urlVideo) {
                    IconeAtual = FaVideo;
                    estiloBg = "bg-blue-50";
                    estiloIcone = "text-blue-500";
                  } else if (post.tipo === 'aviso') {
                    IconeAtual = FaBullhorn;
                    estiloBg = "bg-yellow-50";
                    estiloIcone = "text-yellow-500";
                  } else if (post.urlMidia && !post.urlVideo) {
                    IconeAtual = FaImage;
                    estiloBg = "bg-purple-50";
                    estiloIcone = "text-purple-500";
                  }

                  return (
                    <tr key={post.id} className="hover:bg-gray-50/80 transition-colors">
                      
                      {/* Coluna do Ícone Dinâmico */}
                      <td className="p-4 pl-6">
                        <div className={`flex items-center justify-center w-9 h-9 rounded-full ${estiloBg} ${estiloIcone}`}>
                          <IconeAtual size={16} />
                        </div>
                      </td>
                      
                      <td className="p-4 font-semibold text-gray-900">
                        {post.titulo}
                      </td>
                      
                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.publicado 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {post.publicado ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      
                      {/* Ações Alinhadas */}
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/painel/blog/editar/${post.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center" 
                            title="Editar"
                          >
                            <FaEdit size={16} />
                          </Link>
                          
                          <button 
                            onClick={() => handleExcluir(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center" 
                            title="Excluir"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}