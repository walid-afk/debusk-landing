/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour le développement local (sans export)
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  env: {
    // Charger explicitement les variables d'environnement
    GOOGLE_SERVICE_ACCOUNT_TYPE: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    GOOGLE_PRIVATE_KEY_ID: process.env.GOOGLE_PRIVATE_KEY_ID,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_AUTH_URI: process.env.GOOGLE_AUTH_URI,
    GOOGLE_CLIENT_X509_CERT_URL: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  },
}

module.exports = nextConfig
