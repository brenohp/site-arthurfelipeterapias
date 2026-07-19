import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // A classe scroll-pt-24 avisa ao navegador para "parar" 96px antes do topo
  return (
    <html lang="pt-BR" className="scroll-smooth scroll-pt-24">
      <body className="flex flex-col min-h-screen relative">
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}