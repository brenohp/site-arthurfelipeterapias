import { PrismaClient } from '@prisma/client'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Terapias from './components/Terapias'
import Contato from './components/Contato'

// Força o Next.js a buscar sempre a imagem mais recente do banco,
// sem guardar cache antigo quando você trocar a foto no painel.
export const revalidate = 0;

export default async function Home() {
  const prisma = new PrismaClient()
  
  // O servidor busca na tabela ConfiguracaoSite antes de montar a tela
  const configuracao = await prisma.configuracaoSite.findFirst()

  const fotoHero = configuracao?.fotoHeroUrl || ''
  const fotoSobre = configuracao?.fotoSobreUrl || ''

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Passamos as fotos já prontas como propriedades para os componentes */}
      <Hero fotoHero={fotoHero} />
      <Sobre fotoSobre={fotoSobre} />
      
      <Terapias />
      <Contato />
    </main>
  )
}