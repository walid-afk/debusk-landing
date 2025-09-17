/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour le développement local (sans export)
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
