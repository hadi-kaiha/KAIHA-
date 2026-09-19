import { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KAIHA Seller',
    short_name: 'KAIHA Seller',
    id: '/seller',
    start_url: '/seller?source=pwa',
    scope: '/seller',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [{ src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }],
  }
}
