import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/painel/', '/api/'], // Esconde o painel administrativo do Google
    },
    sitemap: 'https://seusite.com.br/sitemap.xml', // Troque pelo seu domínio real
  }
}