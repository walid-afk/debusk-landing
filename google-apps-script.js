/**
 * Google Apps Script pour capturer les emails dans Google Sheets
 * 
 * CONSTANTES À CONFIGURER :
 */
const SPREADSHEET_ID = '1PSmCjyHRvjLP1DemusnfQJ5jJDjmf9ShfbvyKzwyIjE';
const SHEET_NAME = 'EMAIL DEBUSK';

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
  const headerRange = sheet.getRange(1, 1, 1, 3);
  const headerValues = headerRange.getValues()[0];
  
  if (headerValues[0] !== 'Timestamp' || headerValues[1] !== 'Email' || headerValues[2] !== 'Source') {
    sheet.getRange(1, 1, 1, 3).setValues([['Timestamp', 'Email', 'Source']]);
    // Mettre en forme l'en-tête
    sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    sheet.getRange(1, 1, 1, 3).setBackground('#4285f4');
    sheet.getRange(1, 1, 1, 3).setFontColor('white');
  }
  
  return sheet;
}

/**
 * Fonction principale appelée par POST
 */
function doPost(e) {
  try {
    // S'assurer que la feuille existe
    const sheet = ensureSheet_();
    
    // Parser les données JSON
    const data = JSON.parse(e.postData.contents);
    const { email, ts, source } = data;
    
    // Validation email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email || !emailRegex.test(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Email invalide' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Préparer les données à insérer
    const timestamp = ts ? new Date(ts) : new Date();
    const rowData = [timestamp, email.trim(), source || 'landing'];
    
    // Ajouter la ligne
    sheet.appendRow(rowData);
    
    // Retourner succès
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Email ajouté avec succès' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erreur dans doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Erreur serveur' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Fonction de test (optionnelle)
 */
function testFunction() {
  const testData = {
    email: 'test@example.com',
    ts: new Date().toISOString(),
    source: 'test'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
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
 * 9. Collez cette URL dans APPS_SCRIPT_WEBAPP_URL de votre .env.local
 */
