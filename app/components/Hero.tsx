import Link from 'next/link'

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-10 py-16 md:py-24">
      
      {/* Coluna de Texto */}
      <div className="flex-1 space-y-6">
        
        {/* Selo de Autoridade */}
        <div className="inline-block bg-brand-red/10 border border-brand-red/20 text-brand-red font-semibold px-4 py-1.5 rounded-full text-sm mb-2">
          + Mais de 4.000 atendimentos realizados
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-brand-black leading-tight">
          Equilíbrio e Bem-estar com <span className="text-brand-red">Quiropraxia e Terapias Especializadas</span>
        </h1>
        
        <p className="text-lg text-brand-black/80 font-medium italic border-l-4 border-brand-red pl-4">
          "Cuidamos do seu equilíbrio tanto físico quanto mental, tudo através das mãos e dos martelos."
        </p>

        <p className="text-brand-black/70">
          Especialista em Quiropraxia, Terapia Manual, tratamento de Coluna, Esporão de Calcâneo e Tendinopatias. Agende sua avaliação e recupere sua qualidade de vida.
        </p>
        
        <div className="pt-4">
          <Link 
            href="#contato" 
            className="inline-block bg-brand-red text-[#f5f5f5] font-medium text-lg py-3 px-8 rounded-sm hover:bg-red-800 transition-colors shadow-md"
          >
            Agendar uma Avaliação
          </Link>
        </div>
      </div>

      {/* Coluna da Imagem */}
      <div className="flex-1 w-full flex justify-center md:justify-end">
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border-4 border-brand-red flex items-center justify-center bg-black/5 shadow-xl relative overflow-hidden">
           <span className="text-brand-black/50 text-center px-4">
             [Espaço para a foto do Arthur Felipe]
           </span>
        </div>
      </div>

    </section>
  )
}