import { FaWhatsapp, FaInstagram, FaStar } from 'react-icons/fa'

export default function Contato() {
  return (
    <section id="contato" className="py-16 md:py-24 border-t border-brand-red/20">
      <div className="bg-brand-black rounded-2xl p-8 md:p-16 shadow-2xl">
        
        {/* Cabeçalho do Contato */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Pronto para agendar sua <span className="text-brand-red">Sessão</span>?
          </h2>
          <p className="mt-4 text-brand-beige/80 text-lg">
            Entre em contato para tirar dúvidas, avaliar seu caso ou marcar o seu horário.
          </p>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          
          {/* WhatsApp */}
          <div className="flex flex-col items-center gap-4">
            <div className="bg-brand-red p-5 rounded-full shadow-lg">
              <FaWhatsapp className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white">WhatsApp</h3>
              <p className="text-brand-beige/80 mt-2">(16) 98101-0674</p>
              <a 
                href="https://wa.me/5516981010674" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-red hover:text-white transition-colors mt-2 inline-block font-medium"
              >
                Agendar avaliação
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex flex-col items-center gap-4">
            <div className="bg-brand-red p-5 rounded-full shadow-lg">
              <FaInstagram className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white">Instagram</h3>
              <p className="text-brand-beige/80 mt-2">@arthurfelipe_terapias_</p>
              <a 
                href="https://instagram.com/arthurfelipe_terapias_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-red hover:text-white transition-colors mt-2 inline-block font-medium"
              >
                Acompanhe meu trabalho
              </a>
            </div>
          </div>

          {/* Avaliações do Google */}
          <div className="flex flex-col items-center gap-4">
            <div className="bg-brand-red p-5 rounded-full shadow-lg">
              <FaStar className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white">Avaliações</h3>
              <p className="text-brand-beige/80 mt-2">5,0 ⭐ no Google</p>
              <a 
                href="https://www.google.com/search?q=arhur+felipe+terapias&oq=arhur+felipe+terapias&gs_lcrp=EgZjaHJvbWUyCwgAEEUYChg5GKABMgkIARAhGAoYoAHSAQg0MjgzajBqN6gCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x94b9bf6617d2e50f:0xe12c57c6dd1e1a6,1,,,," 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-red hover:text-white transition-colors mt-2 inline-block font-medium italic"
              >
                "O melhor de Ribeirão e região!"
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}