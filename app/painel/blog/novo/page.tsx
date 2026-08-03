'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaSave, FaImage, FaSpinner, FaArrowLeft } from 'react-icons/fa'

export default function NovoPostPage() {
  const router = useRouter()
  
  const [titulo, setTitulo] = useState('')
  const [resumo, setResumo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [urlMidia, setUrlMidia] = useState('')
  const [urlVideo, setUrlVideo] = useState('')
  const [publicado, setPublicado] = useState(true)

  const [salvando, setSalvando] = useState(false)
  const [fazendoUpload, setFazendoUpload] = useState(false)

  const gerarSlug = (texto: string) => {
    return texto.toString().toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
  }

  const handleUploadImagem = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFazendoUpload(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) setUrlMidia(data.url)
      else alert('Erro ao fazer upload da imagem.')
    } catch (error) {
      alert('Erro de conexão ao enviar imagem.')
    } finally {
      setFazendoUpload(false)
    }
  }

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo || !conteudo) return alert("Título e conteúdo são obrigatórios.")
    
    setSalvando(true)
    const slug = gerarSlug(titulo)
    
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          titulo, 
          resumo, 
          conteudo, 
          slug, 
          urlMidia, 
          urlVideo, // <--- Enviando o link do vídeo corretamente
          publicado 
        })
      })

      if (res.ok) {
        alert('Post criado com sucesso!')
        router.push('/painel/blog')
      } else {
        alert('Erro ao criar o post.')
      }
    } catch (error) {
      alert('Erro de conexão.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      
      <div className="mb-6">
        <Link href="/painel/blog" className="inline-flex items-center gap-2 text-brand-red font-medium hover:text-red-800 transition-colors mb-4">
          <FaArrowLeft /> Voltar
        </Link>
        <h1 className="text-3xl font-bold text-brand-black">Novo Artigo / Post</h1>
      </div>

      <form onSubmit={handleSalvar} className="space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título do Artigo</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-red outline-none" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resumo Breve</label>
          <textarea 
            value={resumo} 
            onChange={(e) => setResumo(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-red outline-none" 
            rows={2} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo Completo</label>
          <textarea 
            value={conteudo} 
            onChange={(e) => setConteudo(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-red outline-none" 
            rows={8} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa (Opcional)</label>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 border-dashed flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              {urlMidia ? (
                <>
                  <img src={urlMidia} alt="Capa" className="w-24 h-24 object-cover rounded-md shadow-sm border" />
                  <button type="button" onClick={() => setUrlMidia('')} className="text-xs text-brand-red font-medium hover:underline">Remover</button>
                </>
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 p-2">
                  <FaImage className="text-2xl mb-1" />
                </div>
              )}
            </div>
            <div className="flex-1 w-full">
              {fazendoUpload && <p className="text-brand-red text-sm mb-2 flex items-center gap-2"><FaSpinner className="animate-spin" /> Enviando...</p>}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleUploadImagem} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-red file:text-white hover:file:bg-red-800 cursor-pointer" 
              />
            </div>
          </div>
        </div>

        {/* Campo para o Link do Vídeo do YouTube */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link do Vídeo do YouTube (Opcional)</label>
          <input 
            type="text" 
            value={urlVideo} 
            onChange={(e) => setUrlVideo(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-red outline-none" 
            placeholder="Ex: https://www.youtube.com/watch?v=XYZ123"
          />
          <p className="text-xs text-gray-500 mt-1">Se preenchido, a miniatura do vídeo do YouTube será gerada automaticamente na listagem.</p>
        </div>

        <div className="pt-4 border-t flex justify-between items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={publicado} 
              onChange={(e) => setPublicado(e.target.checked)} 
              className="w-4 h-4 text-brand-red rounded focus:ring-brand-red" 
            />
            <span className="text-sm font-medium text-gray-700">Publicar imediatamente</span>
          </label>
          
          <button 
            type="submit" 
            disabled={salvando || fazendoUpload} 
            className={`bg-brand-red text-white px-8 py-2.5 rounded-md font-bold transition-all shadow-md flex items-center gap-2 ${(salvando || fazendoUpload) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-800'}`}
          >
            <FaSave />
            {salvando ? 'Salvando...' : 'Salvar Artigo'}
          </button>
        </div>
      </form>

    </div>
  )
}