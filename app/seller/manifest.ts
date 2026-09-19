import { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KAIHA Admin',
    short_name: 'KAIHA Admin',
    id: '/kaiha-admin-786',
    start_url: '/kaiha-admin-786?source=pwa',
    scope: '/kaiha-admin-786',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [{ src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }],
  }
}
