# Configuration Google Sheets avec Service Account

## 📋 Étapes de configuration

### 1. Créer un Service Account Google

1. **Allez sur** : https://console.developers.google.com/
2. **Créez un nouveau projet** ou sélectionnez un projet existant
3. **Activez l'API Google Sheets** :
   - Allez dans "APIs & Services" > "Library"
   - Recherchez "Google Sheets API"
   - Cliquez sur "Enable"
4. **Créez un Service Account** :
   - Allez dans "APIs & Services" > "Credentials"
   - Cliquez sur "Create Credentials" > "Service Account"
   - Donnez un nom à votre service account (ex: "debusk-sheets")
   - Cliquez sur "Create and Continue"
   - Rôle : "Editor" (ou "Owner")
   - Cliquez sur "Done"

### 2. Générer la clé du Service Account

1. **Cliquez sur le Service Account** créé
2. **Onglet "Keys"** > "Add Key" > "Create new key"
3. **Type** : JSON
4. **Téléchargez le fichier JSON** (gardez-le secret !)

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les données du fichier JSON :

```env
GOOGLE_SERVICE_ACCOUNT_TYPE=service_account
GOOGLE_PROJECT_ID=votre_project_id
GOOGLE_PRIVATE_KEY_ID=votre_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nvotre_private_key\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=votre_service_account@votre_project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=votre_client_id
GOOGLE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/votre_service_account%40votre_project.iam.gserviceaccount.com
GOOGLE_SHEET_ID=1PSmCjyHRvjLP1DemusnfQJ5jJDjmf9ShfbvyKzwyIjE
```

### 4. Configurer votre Google Sheet

1. **Créez ou ouvrez** votre Google Sheet
2. **Partagez la feuille** avec l'email du service account :
   - Cliquez sur "Partager" (bouton bleu en haut à droite)
   - Ajoutez l'email du service account (ex: `debusk-sheets@votre-project.iam.gserviceaccount.com`)
   - Donnez les permissions "Éditeur"
3. **Structure de la feuille** :
   - **Feuille** : "EMAIL DEBUSK"
   - **Colonnes** : Timestamp | Email | Prénom | Nom | Type utilisateur | Profession | Source

### 5. Structure des colonnes

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Email | Prénom | Nom | Type utilisateur | Profession | Source |

**Types d'utilisateur** :
- particulier
- freelance  
- startup
- pme
- grande-entreprise

## 🚀 Test

1. **Démarrez le serveur** : `npm run dev`
2. **Testez le formulaire** sur `http://localhost:3000/listeattente`
3. **Vérifiez** que les données apparaissent dans votre Google Sheet

## 📊 Données collectées

Chaque inscription ajoute une ligne avec :
- **Timestamp** : Date et heure d'inscription (ISO format)
- **Email** : Adresse email de l'utilisateur
- **Prénom** : Prénom de l'utilisateur
- **Nom** : Nom de l'utilisateur
- **Type d'utilisateur** : Particulier, Freelance, Startup, PME, Grande entreprise
- **Profession** : Profession (optionnel)
- **Source** : "popup"

## 🛡️ Sécurité

- **Service Account** : Authentification sécurisée avec JWT
- **Honeypot** : Champ `company` caché pour détecter les bots
- **Validation** : Regex email côté client et serveur
- **Anti-bot** : Délai de 300ms côté serveur
- **Permissions** : Accès limité uniquement à votre Google Sheet

## 🐛 Dépannage

### Erreur "Configuration manquante"
- Vérifiez que toutes les variables d'environnement sont définies dans `.env.local`
- Vérifiez que `GOOGLE_SHEET_ID` correspond à votre Google Sheet

### Erreur "Service Account authentifié avec succès" mais échec ensuite
- Vérifiez que le service account a bien accès au Google Sheet
- Vérifiez que l'API Google Sheets est activée
- Vérifiez que le nom de la feuille est exactement "EMAIL DEBUSK"

### Erreur 403 Forbidden
- Vérifiez que le Google Sheet est partagé avec l'email du service account
- Vérifiez que les permissions sont "Éditeur" ou "Propriétaire"

### Erreur "Invalid credentials"
- Vérifiez que le fichier JSON du service account est correct
- Vérifiez que les variables d'environnement correspondent exactement au JSON

## 📈 Avantages du Service Account

✅ **Sécurisé** : Pas de clé API exposée  
✅ **Fiable** : Authentification JWT robuste  
✅ **Scalable** : Gestion automatique des tokens  
✅ **Flexible** : Permissions granulaires  
✅ **Professionnel** : Méthode recommandée par Google  

## 🔧 API Route utilisée

Le système utilise uniquement `/api/subscribe-service-account` qui :
- Authentifie avec le Service Account
- Valide les données d'entrée
- Ajoute les données à Google Sheets
- Retourne une réponse JSON avec le statut