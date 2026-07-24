'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes, FaWhatsapp, FaClock, FaInstagram } from 'react-icons/fa'

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  const fecharMenu = () => setMenuAberto(false)

  return (
    <div className="w-full sticky top-0 z-50">
      
      {/* Topbar Escura (Informativa) - Oculta no celular para não poluir */}
      <div className="bg-brand-black text-brand-beige text-xs py-2 px-6 hidden md:block">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-2">
            <span className="text-brand-beige/70 tracking-wide">Bem-vindo à Arthur Felipe Terapias Orientais</span>
          </div>
          
          <div className="flex items-center gap-6 font-medium tracking-wide">
            {/* Relógio */}
            <span className="flex items-center gap-2">
              <FaClock className="text-brand-red" /> Seg - Sáb
            </span>
            
            {/* Telefone / WhatsApp */}
            <a href="https://wa.me/5516981010674" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <FaWhatsapp className="text-brand-red text-sm" /> (16) 98101-0674
            </a>
            
            {/* Instagram */}
            <a href="https://instagram.com/arthurfelipe_terapias_" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors flex items-center">
              <FaInstagram className="text-base" />
            </a>
          </div>

        </div>
      </div>

      {/* Main Header (Menu Claro e Efeito Vidro) */}
      <header className="w-full bg-brand-beige/90 backdrop-blur-md border-b border-brand-red/20 py-4 px-6 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          {/* Logo Textual Refinada (Tamanho Ajustado) */}
          <Link href="/" className="text-xl md:text-2xl font-bold text-brand-black flex items-baseline z-50" onClick={fecharMenu}>
            <span className="text-brand-red text-3xl md:text-4xl">A</span>
            <span className="ml-[1px]">rthur Felipe</span>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-brand-black text-sm uppercase tracking-wider">
            {['Sobre', 'Terapias', 'Blog', 'Contato'].map((item) => (
              <Link 
                key={item}
                href={item === 'Blog' ? '/blog' : `/#${item.toLowerCase()}`} 
                className="relative group py-2"
              >
                <span className="group-hover:text-brand-red transition-colors duration-300">{item}</span>
                {/* Efeito de Sublinhado Animado */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          
          {/* Botão CTA Desktop */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/5516981010674" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-red text-[#f5f5f5] px-6 py-2.5 rounded-sm font-semibold hover:bg-red-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
            >
              <FaWhatsapp className="text-lg" />
              Agendar Consulta
            </a>
          </div>

          {/* Ícone Menu Mobile (Hambúrguer) */}
          <button 
            className="md:hidden text-brand-black text-2xl z-50 p-2"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
          >
            {menuAberto ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Menu Dropdown Mobile */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-brand-beige border-b border-brand-red/20 shadow-xl transition-all duration-300 overflow-hidden ${
            menuAberto ? 'max-h-[400px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
          }`}
        >
          <nav className="flex flex-col items-center gap-6 font-semibold text-brand-black text-lg uppercase tracking-wider">
            {['Sobre', 'Terapias', 'Blog', 'Contato'].map((item) => (
              <Link 
                key={item}
                href={item === 'Blog' ? '/blog' : `/#${item.toLowerCase()}`} 
                onClick={fecharMenu}
                className="hover:text-brand-red transition-colors duration-300 w-full text-center"
              >
                {item}
              </Link>
            ))}
            
            <a 
              href="https://wa.me/5516981010674" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={fecharMenu}
              className="bg-brand-red text-[#f5f5f5] px-8 py-3 rounded-sm font-semibold hover:bg-red-800 transition-colors shadow-md flex items-center gap-2 mt-4"
            >
              <FaWhatsapp className="text-xl" />
              Agendar Consulta
            </a>
          </nav>
        </div>
      </header>
    </div>
  )
}