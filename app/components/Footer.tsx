'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const anoAtual = new Date().getFullYear();
  const pathname = usePathname();


  if (pathname.startsWith('/painel') || pathname.startsWith('/login')){
    return null; // Não renderiza o Footer nas páginas do painel ou login
}

  return (
    <footer className="w-full bg-brand-black text-brand-beige py-8 border-t-4 border-brand-red mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Nova área de CTA (Call to Action) no Footer */}
        <div className="text-center md:text-left">
          <p className="text-lg font-bold mb-3 text-white">Ainda com dúvidas?</p>
          <a 
            href="https://wa.me/5516981010674" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-sm hover:bg-red-800 transition-colors font-medium shadow-lg"
          >
            <FaWhatsapp className="text-2xl" />
            Falar com o Arthur
          </a>
        </div>

        {/* Informações e Direitos Autorais */}
        <div className="text-center md:text-right text-sm text-brand-beige/70">
          <p className="mb-1">&copy; {anoAtual} Arthur Felipe Terapias.</p>
          <p>Todos os direitos reservados | Ribeirão Preto - SP</p>
        </div>

      </div>
    </footer>
  )
}