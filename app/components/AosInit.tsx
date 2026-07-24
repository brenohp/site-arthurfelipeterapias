'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css' // Importa os estilos mágicos da biblioteca

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Duração da animação (0.8s) - bem suave
      once: true,    // Anima apenas na primeira vez que rola a página
      easing: 'ease-out-cubic', // Curva de velocidade premium
      offset: 100,   // Começa a animar 100px antes do elemento aparecer
    })
  }, [])

  return null
}