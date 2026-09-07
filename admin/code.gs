/**
 * Google Apps Script — Order storage backend
 *
 * SETUP (once):
 *  1. Create a new Google Sheet, then in Apps Script paste this file (Code.gs).
 *  2. Create a Google Apps Script project attached to that Sheet (Extensions > Apps Script).
 *  3. Paste this file into Code.gs.
 *  4. Replace ADMIN_KEY below with a strong password of your choice.
 *  5. Deploy: Deploy > New deployment > Web app.
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  6. Copy the /exec URL into the "SHEET_URL" in your .env and script.js config.
 */

const SHEET_NAME = 'Orders';
const ADMIN_KEY = 'CHANGE_ME_KEY';

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
  }
  return sheet;
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = setup();
    sheet.appendRow([
      new Date(),
      body.name || '',
      body.email || '',
      body.subject || '',
      body.message || ''
    ]);
    return jsonOutput({ success: true });
  } catch (err) {
    return jsonOutput({ success: false, error: err.toString() });
  }
}

function doGet(e) {
  const key = e.parameter.key;
  if (key !== ADMIN_KEY) {
    return jsonOutput({ success: false, error: 'Unauthorized' });
  }
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    const values = sheet ? sheet.getDataRange().getValues() : [];
    const headers = values.shift() || [];
    const orders = values.map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      return obj;
    });
    return jsonOutput({ success: true, orders });
  } catch (err) {
    return jsonOutput({ success: false, error: err.toString() });
  }
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}