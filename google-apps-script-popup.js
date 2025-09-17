/**
 * Google Apps Script pour capturer les emails dans Google Sheets (Version Popup)
 * 
 * CONSTANTES À CONFIGURER :
 */
const SPREADSHEET_ID = '1PSmCjyHRvjLP1DemusnfQJ5jJDjmf9ShfbvyKzwyIjE';
const SHEET_NAME = 'EMAILDEBUSK';

/**
 * Fonction pour s'assurer que la feuille existe et a les bonnes colonnes
 */
function ensureSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  // Créer la feuille si elle n'existe pas
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  
  // Vérifier si l'en-tête existe, sinon le créer
  const headerRange = sheet.getRange(1, 1, 1, 7);
  const headerValues = headerRange.getValues()[0];
  
  if (headerValues[0] !== 'Timestamp' || headerValues[1] !== 'Email' || headerValues[2] !== 'Prénom' || headerValues[3] !== 'Nom' || headerValues[4] !== 'Type' || headerValues[5] !== 'Profession' || headerValues[6] !== 'Source') {
    sheet.getRange(1, 1, 1, 7).setValues([['Timestamp', 'Email', 'Prénom', 'Nom', 'Type', 'Profession', 'Source']]);
    // Mettre en forme l'en-tête
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    sheet.getRange(1, 1, 1, 7).setBackground('#4285f4');
    sheet.getRange(1, 1, 1, 7).setFontColor('white');
  }
  
  return sheet;
}

/**
 * Fonction principale appelée par GET (paramètres URL)
 */
function doGet(e) {
  try {
    console.log('doGet appelé avec:', e);
    
    // Vérifier que les paramètres existent
    if (!e || !e.parameter) {
      console.error('Paramètres manquants:', e);
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Paramètres manquants' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // S'assurer que la feuille existe
    const sheet = ensureSheet_();
    
    // Récupérer les paramètres
    const email = e.parameter.email;
    const firstName = e.parameter.firstName;
    const lastName = e.parameter.lastName;
    const userType = e.parameter.userType;
    const profession = e.parameter.profession;
    const ts = e.parameter.ts;
    const source = e.parameter.source;
    
    console.log('Paramètres reçus:', { email, firstName, lastName, userType, profession, ts, source });
    
    // Validation email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email || !emailRegex.test(email)) {
      console.error('Email invalide:', email);
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Email invalide' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validation des champs requis
    if (!firstName || !lastName) {
      console.error('Prénom ou nom manquant');
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Prénom et nom requis' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Préparer les données à insérer
    const timestamp = ts ? new Date(ts) : new Date();
    const rowData = [
      timestamp, 
      email.trim(), 
      firstName.trim(), 
      lastName.trim(), 
      userType || 'particulier', 
      profession ? profession.trim() : '', 
      source || 'popup'
    ];
    
    // Ajouter la ligne
    sheet.appendRow(rowData);
    
    console.log('Données ajoutées avec succès:', rowData);
    
    // Retourner succès
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Données ajoutées avec succès' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erreur dans doGet:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Erreur serveur: ' + error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Fonction de test (optionnelle)
 */
function testFunction() {
  const testEvent = {
    parameter: {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      userType: 'particulier',
      profession: 'Développeur',
      ts: new Date().toISOString(),
      source: 'test'
    }
  };
  
  const result = doGet(testEvent);
  console.log('Test result:', result.getContent());
}

/**
 * INSTRUCTIONS DE DÉPLOIEMENT :
 * 
 * 1. Ouvrez Google Apps Script (script.google.com)
 * 2. Créez un nouveau projet
 * 3. Collez ce code dans le fichier Code.gs
 * 4. Sauvegardez le projet
 * 5. Cliquez sur "Déployer" > "Déployer en tant qu'application web"
 * 6. Configuration :
 *    - Exécuter en tant que : Moi
 *    - Accès : Tout le monde disposant du lien
 * 7. Cliquez sur "Déployer"
 * 8. Copiez l'URL (se termine par /exec)
 * 9. Collez cette URL dans votre composant EmailCapturePopup
 */
