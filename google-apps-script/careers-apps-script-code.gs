/**
 * Royal EduHub — Careers Application Handler (No-Email Version)
 * - Saves applications to a Google Sheet (Careers_YYYY tab)
 * - Uploads resume file to a secured Drive folder
 * - Emails are DISABLED by default (HR_NOTIFICATION_EMAILS = [])
 */

// === CONFIGURE THESE CONSTANTS ===
const CAREERS_SHEET_ID = '1T3ZJnsMHU69qNku15y4x4I9HOKEzNoevydyL3Cx4wnE'; // <-- Your Google Sheet ID
const CAREERS_DRIVE_FOLDER_ID = '1YKxQYcpgVW2BL7D_uvhTPhh_eIv1b3GE';           // <-- Your Drive Folder ID
const HR_NOTIFICATION_EMAILS = []; // Leave empty to disable emails (recommended per your request)
// Optional shared secret (set a value and send the same from frontend payload as `secret`)
const SHARED_SECRET = ''; // e.g., 'royaledu_careers_2025'

// File validation (aligns with frontend limits)
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Health check endpoint
 */
function doGet() {
  return jsonResponse(true, 'Careers handler is running', { time: new Date().toISOString() });
}

/**
 * Main POST handler — expects JSON body matching the frontend payload:
 * {
 *   name, email, phone,
 *   departments: string[], vacancies: string[],
 *   message: string,
 *   resume: { base64, name, type, size, sha256 } | null,
 *   source?: string,
 *   secret?: string (optional if SHARED_SECRET is set)
 * }
 */
function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw) {
      return jsonResponse(false, 'No data received');
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      return jsonResponse(false, 'Invalid JSON payload');
    }
    if (typeof data !== 'object' || data === null) {
      data = {};
    }

    // Optional: verify shared secret
    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return jsonResponse(false, 'Unauthorized');
    }

    // Validate required fields
    const required = ['name', 'email', 'phone'];
    for (const key of required) {
      if (!data[key] || String(data[key]).trim() === '') {
        return jsonResponse(false, `Missing required field: ${key}`);
      }
    }

    // Handle resume (optional but recommended)
    let driveFile = null;
    if (data.resume && data.resume.base64) {
      const { base64, name, type, size, sha256 } = data.resume;

      if (!type || !ALLOWED_TYPES.includes(type)) {
        return jsonResponse(false, 'Unsupported file type');
      }
      if (typeof size === 'number' && size > MAX_BYTES) {
        return jsonResponse(false, 'File too large (max 5 MB)');
      }

      const folder = DriveApp.getFolderById(CAREERS_DRIVE_FOLDER_ID);
      const cleanBase64 = typeof base64 === 'string' && base64.indexOf(',') !== -1
        ? base64.split(',').pop()
        : base64;
      const blob = Utilities.newBlob(Utilities.base64Decode(cleanBase64), type || 'application/octet-stream', name || 'resume');
      driveFile = folder.createFile(blob);
      if (sha256) driveFile.setDescription(`SHA-256: ${sha256}`);
      // Keep files restricted/private — do NOT make public links
    }

    // Save to yearly sheet
    const save = saveToCareersSheet(data, driveFile);

    // Optional email (disabled by default)
    if (Array.isArray(HR_NOTIFICATION_EMAILS) && HR_NOTIFICATION_EMAILS.length > 0) {
      sendHrEmail(data, driveFile, save.sheetName, save.rowNumber);
    }

    return jsonResponse(true, 'Application received', {
      sheetName: save.sheetName,
      rowNumber: save.rowNumber,
      fileId: driveFile ? driveFile.getId() : null,
    });
  } catch (err) {
    return jsonResponse(false, 'Server error: ' + err.message);
  }
}

/**
 * Save data into "Careers_YYYY" sheet, auto-create headers if needed
 */
function saveToCareersSheet(data, file) {
  const d = data || {};
  const ss = SpreadsheetApp.openById(CAREERS_SHEET_ID);
  const year = new Date().getFullYear();
  const sheetName = `Careers_${year}`;
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headers = [
      'Timestamp', 'Name', 'Email', 'Phone',
      'Departments', 'Vacancies', 'Message',
      'Resume Name', 'Resume Type', 'Resume Size (KB)', 'Resume SHA-256',
      'Resume Drive File ID', 'Resume Drive Link',
      'Source', 'Status',
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#202124').setFontColor('#ffffff').setFontWeight('bold');
  }

  const resumeName = file ? file.getName() : (d.resume && d.resume.name) || '';
  const resumeType = file ? file.getMimeType() : (d.resume && d.resume.type) || '';
  const resumeSizeKb = d.resume && d.resume.size ? Math.round(d.resume.size / 1024) : '';
  const resumeSha = (d.resume && d.resume.sha256) || '';
  const fileId = file ? file.getId() : '';
  const fileLink = file ? `https://drive.google.com/file/d/${fileId}/view` : '';

  const row = [
    new Date(),
    d.name || '',
    d.email || '',
    d.phone || '',
    Array.isArray(d.departments) ? d.departments.join(', ') : '',
    Array.isArray(d.vacancies) ? d.vacancies.join(', ') : '',
    d.message || '',
    resumeName,
    resumeType,
    resumeSizeKb,
    resumeSha,
    fileId,
    fileLink,
    d.source || 'Careers Page',
    'New',
  ];

  sheet.appendRow(row);
  return { sheetName, rowNumber: sheet.getLastRow() };
}

/**
 * Optional HR email (not used if HR_NOTIFICATION_EMAILS = [])
 */
function sendHrEmail(data, file, sheetName, rowNumber) {
  try {
    if (!Array.isArray(HR_NOTIFICATION_EMAILS) || HR_NOTIFICATION_EMAILS.length === 0) return;

    const subject = `New Careers Application — ${data.name}`;
    const driveLink = file
      ? `\nResume: https://drive.google.com/file/d/${file.getId()}/view`
      : '\nResume: Not provided';

    const body =
      `A new application has been received.\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone}\n` +
      `Departments: ${Array.isArray(data.departments) ? data.departments.join(', ') : ''}\n` +
      `Vacancies: ${Array.isArray(data.vacancies) ? data.vacancies.join(', ') : ''}\n` +
      `Message: ${data.message || ''}\n` +
      `Saved to: ${sheetName} (row ${rowNumber})` +
      driveLink;

    MailApp.sendEmail({
      to: HR_NOTIFICATION_EMAILS.join(','),
      subject,
      body,
    });
  } catch (err) {
    // Ignore email errors
  }
}

/**
 * Standard JSON response helper
 */
function jsonResponse(success, message, data) {
  const payload = JSON.stringify({ success, message, ...(data || {}) });
  return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
}