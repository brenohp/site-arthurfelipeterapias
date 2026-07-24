'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [mostrar, setMostrar] = useState(false)

  useEffect(() => {
    // Quando o site carrega, verifica se o usuário já aceitou antes
    const consentimento = localStorage.getItem('cookiesAceitos')
    if (!consentimento) {
      setMostrar(true) // Se não aceitou ainda, mostra o aviso
    }
  }, [])

  const handleAceitar = () => {
    localStorage.setItem('cookiesAceitos', 'true') // Salva a escolha do usuário
    setMostrar(false) // Esconde o aviso
  }

  // Se "mostrar" for falso (já aceitou), não renderiza nada na tela
  if (!mostrar) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-brand-black text-white p-4 z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border-t border-brand-red/30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="text-sm text-brand-beige/80 text-center sm:text-left">
          <p>
            Utilizamos cookies para melhorar a sua experiência no site, analisar o tráfego e personalizar conteúdos. Ao continuar navegando, você concorda com a nossa política de privacidade.
          </p>
        </div>

        <button
          onClick={handleAceitar}
          className="bg-brand-red text-white whitespace-nowrap px-6 py-2 rounded-sm font-bold hover:bg-red-800 transition-colors shadow-lg"
        >
          Entendi e Aceito
        </button>

      </div>
    </div>
  )
}