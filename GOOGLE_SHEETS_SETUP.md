# Configuration Google Sheets API

## 📋 Étapes de configuration

### 1. Créer un fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet avec :

```env
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here
```

### 2. Obtenir une clé API Google

1. **Allez sur** : https://console.developers.google.com/
2. **Créez un nouveau projet** ou sélectionnez un projet existant
3. **Activez l'API Google Sheets** :
   - Allez dans "APIs & Services" > "Library"
   - Recherchez "Google Sheets API"
   - Cliquez sur "Enable"
4. **Créez une clé API** :
   - Allez dans "APIs & Services" > "Credentials"
   - Cliquez sur "Create Credentials" > "API Key"
   - Copiez la clé générée
5. **Collez la clé** dans votre fichier `.env.local`

### 3. Configurer votre Google Sheet

Le code utilise déjà cette configuration :
- **Spreadsheet ID** : `1PSmCjyHRvjLP1DemusnfQJ5jJDjmf9ShfbvyKzwyIjE`
- **Sheet Name** : `EMAIL DEBUSK`

### 4. Structure de la feuille

La feuille doit avoir ces colonnes :
- **A** : Timestamp
- **B** : Email
- **C** : Prénom
- **D** : Nom
- **E** : Type d'utilisateur
- **F** : Profession
- **G** : Source

### 5. Permissions

Assurez-vous que votre Google Sheet est :
- **Public en lecture** (pour l'API)
- **Ou partagé** avec le service account si vous en utilisez un

## 🚀 Test

1. **Démarrez le serveur** : `npm run dev`
2. **Testez le formulaire** sur `http://localhost:3001/listeattente`
3. **Vérifiez** que les emails apparaissent dans votre Google Sheet

## 📊 Données collectées

Chaque inscription ajoute une ligne avec :
- **Timestamp** : Date et heure d'inscription
- **Email** : Adresse email de l'utilisateur
- **Prénom** : Prénom de l'utilisateur
- **Nom** : Nom de l'utilisateur
- **Type d'utilisateur** : Particulier, Freelance, Startup, PME, Grande entreprise
- **Profession** : Profession (optionnel)
- **Source** : "popup"

## 🛡️ Sécurité

- **Honeypot** : Champ `company` caché pour détecter les bots
- **Validation** : Regex email côté client et serveur
- **Anti-bot** : Délai de 300ms côté serveur
- **API Key** : Stockée dans `.env.local` (ne pas commiter)

## 🐛 Dépannage

### Erreur "Configuration manquante"
- Vérifiez que `GOOGLE_SHEETS_API_KEY` est définie dans `.env.local`

### Erreur "Google Sheets API"
- Vérifiez que l'API Google Sheets est activée
- Vérifiez que la clé API est correcte
- Vérifiez les permissions du Google Sheet

### Erreur 403 Forbidden
- Vérifiez que le Google Sheet est public en lecture
- Ou configurez un service account avec les bonnes permissions
