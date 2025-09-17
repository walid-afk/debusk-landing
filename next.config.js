/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // Export statique pour GitHub Pages
  output: 'export',
  trailingSlash: true,
  // Configuration pour GitHub Pages
  basePath: isProd ? '/debusk-landing' : '',
  assetPrefix: isProd ? '/debusk-landing/' : '',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
