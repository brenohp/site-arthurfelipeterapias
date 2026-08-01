'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro('')

    // Chama o NextAuth para tentar fazer o login
    const resultado = await signIn('credentials', {
      email,
      password,
      redirect: false, // Bloqueia o redirecionamento automático para tratarmos erros
    })

    if (resultado?.error) {
      setErro('E-mail ou senha incorretos. Tente novamente.')
      setCarregando(false)
    } else {
      // Se deu certo, manda o Arthur para a página do painel
      router.push('/painel')
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen bg-brand-beige flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-brand-red/10">
        
        {/* Cabeçalho do Login */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-brand-black inline-block mb-2 hover:opacity-80 transition-opacity">
            <span className="text-brand-red text-3xl">A</span>rthur Felipe
          </Link>
          <h1 className="text-xl font-semibold text-brand-black/80">
            Acesso Restrito
          </h1>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Mensagem de Erro */}
          {erro && (
            <div className="bg-red-50 text-brand-red text-sm p-3 rounded-md border border-red-200 text-center font-medium">
              {erro}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brand-black mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black mb-1" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className={`w-full bg-brand-red text-white font-bold py-3 px-4 rounded-md transition-all shadow-md ${
              carregando ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-800 hover:shadow-lg'
            }`}
          >
            {carregando ? 'Entrando...' : 'Entrar no Painel'}
          </button>
          
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-brand-black/60 hover:text-brand-red transition-colors">
            &larr; Voltar para o site
          </Link>
        </div>

      </div>
    </main>
  )
}