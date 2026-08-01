import Link from 'next/link'
import { FaPen, FaCog, FaChartLine } from 'react-icons/fa'

export default function PainelDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold text-brand-black">Bem-vindo ao seu Painel!</h1>
          <p className="text-gray-600 mt-1">Aqui você tem o controle total do conteúdo do seu site.</p>
        </div>

        {/* Cards de Acesso Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center text-xl mb-4">
              <FaPen />
            </div>
            <h2 className="text-xl font-bold text-brand-black mb-2">Blog e Artigos</h2>
            <p className="text-gray-600 mb-6 text-sm flex-grow">
              Escreva novos artigos, dicas para pacientes e gerencie todos os posts já publicados no site.
            </p>
            <Link href="/painel/blog" className="text-brand-red font-semibold hover:underline inline-flex items-center gap-2">
              Acessar Blog &rarr;
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xl mb-4">
              <FaCog />
            </div>
            <h2 className="text-xl font-bold text-brand-black mb-2">Configurações</h2>
            <p className="text-gray-600 mb-6 text-sm flex-grow">
              Altere os avisos do topo do site, os dias de atendimento e faça upload das fotos principais.
            </p>
            <Link href="/painel/configuracoes" className="text-brand-red font-semibold hover:underline inline-flex items-center gap-2">
              Abrir Configurações &rarr;
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}