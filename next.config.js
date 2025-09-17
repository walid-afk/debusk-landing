/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration conditionnelle : export seulement pour GitHub Pages
  ...(process.env.GITHUB_ACTIONS === 'true' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
