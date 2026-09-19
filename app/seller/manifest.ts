import { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KAIHA Seller',
    short_name: 'KAIHA Seller',
    start_url: '/seller',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' }
    ],
  }
}
