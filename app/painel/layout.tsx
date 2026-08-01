'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { FaFileAlt, FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa'

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const links = [
    { nome: 'Meus Posts', rota: '/painel', icone: <FaFileAlt /> },
    { nome: 'Configurações do Site', rota: '/painel/configuracoes', icone: <FaCog /> },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Menu Lateral (Sidebar) */}
      <aside className="w-64 bg-brand-black text-white flex flex-col shadow-2xl">
        
        {/* Logo do Painel */}
        <div className="p-6 border-b border-brand-red/20 text-center">
          <Link href="/painel" className="text-2xl font-bold text-white inline-block">
            <span className="text-brand-red text-3xl">A</span>rthur
          </Link>
          <p className="text-xs text-brand-beige/60 mt-1 uppercase tracking-widest">Painel Admin</p>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {links.map((link) => {
            const ativo = pathname === link.rota
            return (
              <Link
                key={link.rota}
                href={link.rota}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 ${
                  ativo 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-lg">{link.icone}</span>
                <span className="font-medium">{link.nome}</span>
              </Link>
            )
          })}
        </nav>

        {/* Rodapé do Menu (Sair e Voltar pro Site) */}
        <div className="p-4 border-t border-brand-red/20 space-y-2">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <FaHome className="text-lg" /> Ver site no ar
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-brand-red transition-colors text-sm"
          >
            <FaSignOutAlt className="text-lg" /> Sair do Painel
          </button>
        </div>
      </aside>

      {/* Área Principal (Onde o conteúdo das páginas vai renderizar) */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      
    </div>
  )
}