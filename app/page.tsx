import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Terapias from './components/Terapias'
import Contato from './components/Contato'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <Hero />
      <Sobre />
      <Terapias />
      <Contato />
    </main>
  )
}