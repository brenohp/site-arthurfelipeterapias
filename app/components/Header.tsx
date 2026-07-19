import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-brand-beige border-b-2 border-brand-red py-4 px-6 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo Textual Corrigida: A (vermelho) + rthur Felipe (preto) */}
        <Link href="/" className="text-2xl md:text-3xl font-bold text-brand-black flex items-baseline">
          <span className="text-brand-red text-4xl md:text-5xl">A</span>
          <span className="ml-[1px]">rthur Felipe</span>
        </Link>

        {/* Links de Navegação e Botão CTA */}
        <div className="flex items-center gap-6 md:gap-8">
          <nav className="hidden md:flex gap-6 font-medium text-brand-black">
            <Link href="/#sobre" className="hover:text-brand-red transition-colors duration-300">
              Sobre
            </Link>
            <Link href="/#terapias" className="hover:text-brand-red transition-colors duration-300">
              Terapias
            </Link>
            <Link href="/blog" className="hover:text-brand-red transition-colors duration-300">
              Blog
            </Link>
            <Link href="/#contato" className="hover:text-brand-red transition-colors duration-300">
              Contato
            </Link>
          </nav>
          
          {/* Botão de Agendamento no Menu */}
          <a 
            href="https://wa.me/5516981010674" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-brand-red text-[#f5f5f5] px-5 py-2 rounded-sm font-semibold hover:bg-red-800 transition-colors shadow-md text-sm md:text-base"
          >
            Agendar Consulta
          </a>
        </div>
        
      </div>
    </header>
  )
}