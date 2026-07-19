import { FaHands, FaBone, FaYinYang } from 'react-icons/fa'

export default function Terapias() {
  const servicos = [
    {
      titulo: "Terapia Manual",
      descricao: "Tratamento especializado focado na recuperação de tendinopatias e esporão de calcâneo, devolvendo a sua mobilidade natural e qualidade de vida.",
      icone: <FaHands className="text-4xl text-brand-red mb-4" />
    },
    {
      titulo: "Tratamento de Coluna",
      descricao: "Atendimento focado no alívio de dores e correção estrutural, ideal para quem sofre com patologias, desgastes ou desconfortos agudos e crônicos.",
      icone: <FaBone className="text-4xl text-brand-red mb-4" />
    },
    {
      titulo: "Seitai e New Seitai",
      descricao: "Técnica leve e sutil que respeita os limites estruturais do corpo, fazendo com que possa ser aplicada até mesmo em patologias crônicas na região da coluna vertebral.",
      icone: <FaYinYang className="text-4xl text-brand-red mb-4" />
    }
  ]

  return (
    <section id="terapias" className="py-16 md:py-24 border-t border-brand-red/20">
      
      {/* Cabeçalho da Seção */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black">
          Especialidades e <span className="text-brand-red">Terapias</span>
        </h2>
        <p className="mt-4 text-brand-black/80 max-w-2xl mx-auto text-lg">
          Abordagens precisas e personalizadas para tratar a raiz do seu problema.
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicos.map((servico, index) => (
          <div 
            key={index} 
            className="bg-white/40 p-8 rounded-lg border border-brand-red/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-center">
              {servico.icone}
            </div>
            <h3 className="text-2xl font-bold text-brand-black text-center mb-4">
              {servico.titulo}
            </h3>
            <p className="text-brand-black/80 text-center leading-relaxed">
              {servico.descricao}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}