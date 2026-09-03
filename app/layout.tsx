import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CookieConsent from './components/CookieConsent'
import AosInit from './components/AosInit' // <--- NOVA IMPORTAÇÃO
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Arthur Felipe | Terapias Orientais',
  description: 'Tratamentos de Quiropraxia e Terapias para alívio de dores crônicas. O melhor de Ribeirão Preto e região.',
  keywords: ['massoterapia', 'fisioterapia', 'massagem', 'relaxamento', 'quiropraxia', 'dor na coluna', 'massagem terapêutica', 'tratamento para dores'],
  icons: {
    icon: '/favicon.ico',
  },

  verification: {
    google: 'iCti4axdghzMhWGp8Xp262esdo8aZFJ66fE9fp9T__k',
  },

  openGraph: {
    title: 'Arthur Felipe | Quiropaxia e Terapias',
    description: 'Especialista em Quiropraxia, Terapia Manual, tratamento de Coluna, Esporão de Calcâneo e Tendinopatias. Agende sua avaliação e recupere sua qualidade de vida.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://arthurfelipeterapias.com.br', 
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="flex flex-col min-h-screen relative">
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <AosInit /> {/* <--- ATIVANDO AS ANIMAÇÕES AQUI */}
        <Analytics /> {/* <--- VERCEL ANALYTICS ADICIONADO AQUI */}
      </body>
    </html>
  )
}