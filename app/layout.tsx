import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CookieConsent from './components/CookieConsent'
import AosInit from './components/AosInit' // <--- NOVA IMPORTAÇÃO

export const metadata: Metadata = {
  title: 'Arthur Felipe | Terapias',
  description: 'Tratamentos de Quiropraxia e Terapias Orientais para alívio de dores crônicas. O melhor de Ribeirão Preto e região.',
  icons: {
    icon: '/favicon.ico',
  },
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
      </body>
    </html>
  )
}