import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5516981010674"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contato pelo WhatsApp"
    >
      <FaWhatsapp className="text-3xl md:text-4xl" />
      
      {/* Tooltip (balãozinho) que aparece ao passar o mouse (visível apenas em telas maiores) */}
      <span className="absolute right-full mr-4 bg-brand-black text-brand-beige px-3 py-1.5 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
        Agendar Avaliação
      </span>
    </a>
  )
}