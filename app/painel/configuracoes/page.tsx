'use client'

import { useState, useEffect } from 'react'
import { FaSave, FaImage, FaHeading, FaSpinner } from 'react-icons/fa'

export default function ConfiguracoesPage() {
  const [mensagemHeader, setMensagemHeader] = useState('')
  const [horarioHeader, setHorarioHeader] = useState('')
  const [fotoHeroUrl, setFotoHeroUrl] = useState('')
  const [fotoSobreUrl, setFotoSobreUrl] = useState('')
  
  const [salvando, setSalvando] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [fazendoUpload, setFazendoUpload] = useState(false)

  // 1. Busca os dados quando abre a tela
  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await fetch('/api/configuracoes')
        if (res.ok) {
          const dados = await res.json()
          if (dados.mensagemHeader) setMensagemHeader(dados.mensagemHeader)
          if (dados.horarioHeader) setHorarioHeader(dados.horarioHeader)
          if (dados.fotoHeroUrl) setFotoHeroUrl(dados.fotoHeroUrl)
          if (dados.fotoSobreUrl) setFotoSobreUrl(dados.fotoSobreUrl)
        }
      } catch (error) {
        console.error("Erro ao carregar:", error)
      } finally {
        setCarregando(false)
      }
    }
    carregarDados()
  }, [])

  // 2. Função que envia a imagem pro Cloudinary
  const handleUploadImagem = async (e: React.ChangeEvent<HTMLInputElement>, tipo: 'hero' | 'sobre') => {
    const file = e.target.files?.[0]
    if (!file) return

    setFazendoUpload(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      const data = await res.json()
      
      if (data.url) {
        if (tipo === 'hero') setFotoHeroUrl(data.url)
        if (tipo === 'sobre') setFotoSobreUrl(data.url)
        alert('Imagem carregada com sucesso! Clique em "Salvar Alterações" no final da página para aplicar.')
      } else {
        alert('Erro ao fazer upload da imagem.')
      }
    } catch (error) {
      alert('Erro de conexão ao enviar imagem.')
    } finally {
      setFazendoUpload(false)
    }
  }

  // 3. Salva todos os textos e links das fotos no NeonDB
  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault()
    setSalvando(true)
    
    try {
      const res = await fetch('/api/configuracoes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mensagemHeader, 
          horarioHeader,
          fotoHeroUrl,
          fotoSobreUrl
        })
      })

      if (res.ok) {
        alert('Configurações salvas com sucesso!')
      } else {
        alert('Erro ao salvar as configurações.')
      }
    } catch (error) {
      alert('Erro de conexão ao tentar salvar.')
    } finally {
      setSalvando(false)
    }
  }

  if (carregando) {
    return <div className="p-10 text-center text-gray-500">Carregando configurações...</div>
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-black">Configurações do Site</h1>
        <p className="text-gray-600 mt-1">Altere os avisos e as imagens principais do seu site.</p>
      </div>

      <form onSubmit={handleSalvar} className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        
        {/* Seção: Textos do Cabeçalho */}
        <section>
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <FaHeading className="text-brand-red text-xl" />
            <h2 className="text-xl font-semibold text-brand-black">Avisos do Cabeçalho (Topo do site)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem de Aviso</label>
              <input type="text" value={mensagemHeader} onChange={(e) => setMensagemHeader(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-red outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dias de Atendimento</label>
              <input type="text" value={horarioHeader} onChange={(e) => setHorarioHeader(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-red outline-none" />
            </div>
          </div>
        </section>

        {/* Seção: Imagens Principais */}
        <section>
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <FaImage className="text-brand-red text-xl" />
            <h2 className="text-xl font-semibold text-brand-black">Imagens em Atendimento</h2>
          </div>
          
          {fazendoUpload && (
            <div className="mb-4 text-brand-red text-sm font-medium flex items-center gap-2">
              <FaSpinner className="animate-spin" /> Enviando imagem, por favor aguarde...
            </div>
          )}
          
<div className="space-y-6">
            {/* Imagem Hero */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 border-dashed flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                {fotoHeroUrl ? (
                  <>
                    <img src={fotoHeroUrl} alt="Preview Hero" className="w-24 h-24 object-cover rounded-md shadow-sm border" />
                    <button 
                      type="button" 
                      onClick={() => setFotoHeroUrl('')} 
                      className="text-xs text-brand-red font-medium hover:underline"
                    >
                      Remover foto
                    </button>
                  </>
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400 text-center p-2">Sem foto</div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-brand-black">Foto Principal (Hero)</h3>
                <p className="text-sm text-gray-500 mb-2">Aparece logo que o cliente abre o site.</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleUploadImagem(e, 'hero')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-red file:text-white hover:file:bg-red-800 cursor-pointer"
                />
              </div>
            </div>

            {/* Imagem Sobre */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 border-dashed flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                {fotoSobreUrl ? (
                  <>
                    <img src={fotoSobreUrl} alt="Preview Sobre" className="w-24 h-24 object-cover rounded-md shadow-sm border" />
                    <button 
                      type="button" 
                      onClick={() => setFotoSobreUrl('')} 
                      className="text-xs text-brand-red font-medium hover:underline"
                    >
                      Remover foto
                    </button>
                  </>
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400 text-center p-2">Sem foto</div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-brand-black">Foto da seção "Sobre mim"</h3>
                <p className="text-sm text-gray-500 mb-2">A foto que fica ao lado da sua biografia.</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleUploadImagem(e, 'sobre')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-red file:text-white hover:file:bg-red-800 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Botão de Salvar */}
        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={salvando || fazendoUpload} className={`bg-brand-red text-white px-8 py-3 rounded-md font-bold transition-all shadow-md flex items-center gap-2 ${(salvando || fazendoUpload) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-800 hover:shadow-lg'}`}>
            <FaSave />
            {salvando ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>

      </form>
    </div>
  )
}