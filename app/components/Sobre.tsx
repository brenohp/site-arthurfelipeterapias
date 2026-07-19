export default function Sobre() {
  return (
    <section id="sobre" className="py-16 md:py-24 border-t border-brand-red/20">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        
        {/* Coluna de Texto */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
            Sobre <span className="text-brand-red">Arthur Felipe</span>
          </h2>
          <div className="space-y-4 text-brand-black/80 text-lg">
            <p>
              Com dedicação integral ao bem-estar e à saúde física, sou especialista em Fisioterapia e Massoterapia, unindo o conhecimento clínico tradicional com abordagens orientais focadas no reequilíbrio do corpo.
            </p>
            <p>
              Minha especialidade em <strong>Quiropraxia Japonesa (Seitai)</strong> permite atuar diretamente na estrutura corporal, aliviando dores crônicas, corrigindo posturas e melhorando a mobilidade de forma eficaz e natural.
            </p>
            <p>
              Meu principal objetivo é proporcionar um atendimento humanizado, entendendo a necessidade de cada paciente para entregar a melhor qualidade de vida possível.
            </p>
          </div>
        </div>

        {/* Coluna da Imagem/Logo Secundária */}
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-sm aspect-square bg-brand-red/5 rounded-lg border-2 border-dashed border-brand-red/30 flex items-center justify-center p-8 shadow-inner">
            <p className="text-center text-brand-black/50 font-medium">
              [Espaço sugerido para a logo redonda ou uma foto em atendimento]
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}