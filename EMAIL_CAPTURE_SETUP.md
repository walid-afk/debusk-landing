# Configuration Email Capture avec Google Sheets

## 📋 Fichiers créés

### 1. Composant EmailCapture (`components/EmailCapture.tsx`)
- Composant client avec validation email
- Honeypot anti-spam (champ `company` caché)
- États : loading, succès, erreur
- Messages en français
- Texte RGPD

### 2. API Route (`app/api/subscribe/route.ts`)
- Validation côté serveur
- Anti-bot delay (300ms)
- Appel vers Google Apps Script
- Gestion d'erreurs complète

### 3. Google Apps Script (`google-apps-script.js`)
- Constantes configurées pour votre Google Sheet
- Création automatique de la feuille
- Validation email
- Ajout des données avec timestamp

### 4. Variante Directe (`components/EmailCaptureDirect.tsx`)
- POST direct vers Google Apps Script
- Pas besoin d'API route
- Même UX que la version API

## 🚀 Instructions de déploiement

### Étape 1 : Configuration Google Apps Script

1. **Ouvrez Google Apps Script** : https://script.google.com
2. **Créez un nouveau projet**
3. **Collez le code** de `google-apps-script.js` dans `Code.gs`
4. **Sauvegardez** le projet
5. **Déployez** :
   - Cliquez sur "Déployer" > "Déployer en tant qu'application web"
   - **Exécuter en tant que** : Moi
   - **Accès** : Tout le monde disposant du lien
   - Cliquez sur "Déployer"
6. **Copiez l'URL** (se termine par `/exec`)

### Étape 2 : Configuration Next.js

1. **Créez le fichier** `.env.local` :
```env
APPS_SCRIPT_WEBAPP_URL="https://script.google.com/macros/s/VOTRE_ID/exec"
```

2. **Pour la variante directe**, ajoutez aussi :
```env
NEXT_PUBLIC_APPS_SCRIPT_WEBAPP_URL="https://script.google.com/macros/s/VOTRE_ID/exec"
```

### Étape 3 : Test

1. **Démarrez le serveur** : `npm run dev`
2. **Testez le formulaire** sur `http://localhost:3000`
3. **Vérifiez** que les emails apparaissent dans votre Google Sheet

## 📊 Structure Google Sheet

Le script crée automatiquement :
- **Feuille** : "EMAIL DEBUSK"
- **Colonnes** : Timestamp | Email | Source
- **Formatage** : En-tête en bleu avec texte blanc

## 🔧 Utilisation

### Version API (recommandée)
```tsx
import EmailCapture from '@/components/EmailCapture'

// Dans votre composant
<EmailCapture />
```

### Version Directe
```tsx
import EmailCaptureDirect from '@/components/EmailCaptureDirect'

// Dans votre composant
<EmailCaptureDirect />
```

## 🛡️ Sécurité

- **Honeypot** : Champ `company` caché pour détecter les bots
- **Validation** : Regex email côté client et serveur
- **Anti-bot** : Délai de 300ms côté serveur
- **Rate limiting** : Géré par Google Apps Script

## 📝 Messages

- **Succès** : "Merci ! C'est enregistré ✅"
- **Erreur** : "Oups, réessayez dans un instant."
- **RGPD** : "En soumettant, vous acceptez de recevoir des emails de Debusk. Vous pouvez vous désinscrire à tout moment."

## 🐛 Dépannage

### Erreur "Configuration manquante"
- Vérifiez que `APPS_SCRIPT_WEBAPP_URL` est définie dans `.env.local`

### Erreur "Email invalide"
- Vérifiez le format de l'email (regex : `/^[^@\s]+@[^@\s]+\.[^@\s]+$/`)

### Erreur Google Apps Script
- Vérifiez que le script est déployé correctement
- Vérifiez les permissions du Google Sheet
- Vérifiez que `SPREADSHEET_ID` et `SHEET_NAME` sont corrects

## 📈 Données collectées

Chaque inscription ajoute une ligne avec :
- **Timestamp** : Date et heure d'inscription
- **Email** : Adresse email de l'utilisateur
- **Source** : "landing" (ou autre selon le contexte)
