# Debusk - Landing Page

Une landing page moderne pour Debusk, un SaaS anti-abonnements fantômes qui détecte automatiquement les abonnements récurrents cachés et aide à les gérer.

## 🚀 Technologies utilisées

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui** (composants UI)
- **Lucide React** (icônes)

## 📁 Structure du projet

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   └── button.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── TrustSection.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts
└── ...
```

## 🎨 Composants

### Hero
Section d'accueil avec titre impactant, CTA et statistiques clés.

### Features
Présentation des 8 fonctionnalités principales de Debusk avec icônes et descriptions.

### How It Works
Processus en 4 étapes avec images et descriptions détaillées.

### Testimonials
Témoignages clients avec photos, économies réalisées et notes.

### Pricing
3 plans tarifaires (Gratuit, Premium, Famille) avec fonctionnalités détaillées.

### Trust Section
Section dédiée à la sécurité et confiance avec certifications et partenaires bancaires.

### CTA
Call-to-action final avec garantie et statistiques d'impact.

### Footer
Footer complet avec liens, contact, newsletter et certifications.

## 🎯 Fonctionnalités

- ✅ Design responsive (mobile first)
- ✅ Animations et transitions fluides
- ✅ Images placeholder (Unsplash)
- ✅ Contenu en français adapté à Debusk
- ✅ Ton direct et impactant
- ✅ Focus sur la sécurité (DSP2, RGPD)
- ✅ Statistiques d'économies
- ✅ Témoignages clients réalistes

## 🚀 Installation et lancement

```bash
# Installation des dépendances
npm install

# Configuration des variables d'environnement
cp env-local-example.txt .env.local
# Puis remplissez .env.local avec vos vraies valeurs

# Lancement en mode développement
npm run dev

# Test de l'API (optionnel)
node test-api.js

# Build de production
npm run build

# Lancement en production
npm start
```

## 🔧 Configuration Google Sheets

1. **Créez un Service Account** dans [Google Cloud Console](https://console.developers.google.com/)
2. **Téléchargez le fichier JSON** du service account
3. **Copiez les valeurs** dans votre fichier `.env.local`
4. **Partagez votre Google Sheet** avec l'email du service account
5. **Testez** avec le formulaire sur `http://localhost:3000/listeattente`

Voir `GOOGLE_SHEETS_SETUP.md` pour les détails complets.

## 📱 Responsive Design

La landing page est optimisée pour tous les écrans :
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🎨 Design System

- **Couleurs principales** : Bleu (#2563eb), Indigo, Gris
- **Typographie** : Inter (Google Fonts)
- **Espacement** : Système cohérent avec TailwindCSS
- **Composants** : shadcn/ui pour la cohérence

## 📊 Contenu

Tous les textes sont adaptés au produit Debusk :
- Ton direct et impactant
- Focus sur les économies réalisées
- Mise en avant de la sécurité
- Témoignages clients réalistes
- Statistiques convaincantes

## 🔒 Sécurité

Mise en avant des aspects sécurité :
- Conformité DSP2
- Protection RGPD
- Certifications ISO 27001
- Partenaires bancaires français

