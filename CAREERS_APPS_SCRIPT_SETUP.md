# Careers Apps Script Setup Guide

## Overview
This guide helps you set up a separate Google Apps Script to handle career applications from your Royal EduHub website. The script will:
- Save application data to Google Sheets (organized by year)
- Upload resume files to Google Drive
- No email notifications (data storage only)

## Prerequisites
- Google account with access to Google Apps Script
- Google Drive folder for storing resumes
- Google Sheet for storing application data

## Step 1: Prepare Google Resources

### 1.1 Create Google Drive Folder
1. Go to [Google Drive](https://drive.google.com)
2. Click "New" → "Folder"
3. Name it: `Royal EduHub - Career Applications`
4. Right-click the folder → "Share" → Set to "Restricted" (private)
5. Copy the folder ID from the URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`
   - Example: If URL is `https://drive.google.com/drive/folders/1YKxQYcpgVW2BL7D_uvhTPhh_eIv1b3GE`
   - Folder ID is: `1YKxQYcpgVW2BL7D_uvhTPhh_eIv1b3GE`

### 1.2 Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new sheet
3. Rename it: `Royal EduHub - Career Applications`
4. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1T3ZJnsMHU69qNku15y4x4I9HOKEzNoevydyL3Cx4wnE/edit`
   - Sheet ID is: `1T3ZJnsMHU69qNku15y4x4I9HOKEzNoevydyL3Cx4wnE`

## Step 2: Create Apps Script Project

### 2.1 Create New Project
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Rename project to: `Royal EduHub - Careers Handler`

### 2.2 Replace Code.gs Content
1. Delete all existing code in Code.gs
2. Copy the complete code from `careers-apps-script-code.gs` file
3. Paste it into Code.gs

### 2.3 Configure Constants
In the code, update these values:
```javascript
const CAREERS_SHEET_ID = 'YOUR_SHEET_ID_HERE';           // From Step 1.2
const CAREERS_DRIVE_FOLDER_ID = 'YOUR_FOLDER_ID_HERE';   // From Step 1.1
const HR_NOTIFICATION_EMAILS = [];                       // Keep empty for no emails
const SHARED_SECRET = '';                                // Optional security token
```

## Step 3: Deploy Web App

### 3.1 Deploy Settings
1. Click "Deploy" → "New deployment"
2. Click gear icon ⚙️ next to "Type"
3. Select "Web app"
4. Fill in:
   - **Description**: `Careers Handler v1.0`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
5. Click "Deploy"

### 3.2 Grant Permissions
1. Click "Authorize access"
2. Choose your Google account
3. Click "Advanced" if you see a warning
4. Click "Go to Royal EduHub - Careers Handler (unsafe)"
5. Click "Allow"

### 3.3 Copy Web App URL
1. Copy the "Web app URL" (starts with `https://script.google.com/macros/s/`)
2. Save this URL - you'll need it for the website integration

## Step 4: Test the Deployment

### 4.1 Test GET Request
1. Open the Web App URL in a new browser tab
2. You should see: `{"success":true,"message":"Careers handler is running",...}`

### 4.2 Test Sheet Access
1. Go to your Google Sheet
2. The script should have permission to create new sheets automatically

## Step 5: Provide Information for Website Integration

Share these details with your developer:

1. **Web App URL**: `https://script.google.com/macros/s/.../exec`
2. **Google Sheet ID**: `1T3ZJnsMHU69qNku15y4x4I9HOKEzNoevydyL3Cx4wnE`
3. **Drive Folder ID**: `1YKxQYcpgVW2BL7D_uvhTPhh_eIv1b3GE`
4. **Shared Secret**: (if you set one, otherwise leave blank)

## Step 6: Website Integration (Developer Task)

The developer will:
1. Update `APPS_SCRIPT_CAREERS_URL` in `src/services/careersService.js`
2. Add shared secret if configured
3. Test the end-to-end flow

## Expected Behavior

When a user submits a career application:

### Google Sheet
- Creates `Careers_2025` sheet (or current year)
- Adds row with: timestamp, name, email, phone, departments, vacancies, message, resume info
- Headers: Timestamp, Name, Email, Phone, Departments, Vacancies, Message, Resume Name, Resume Type, Resume Size (KB), Resume SHA-256, Resume Drive File ID, Resume Drive Link, Source, Status

### Google Drive
- Uploads resume file to your designated folder
- File name: original filename from upload
- File description: includes SHA-256 hash for verification
- Files remain private (not publicly accessible)

### No Email Notifications
- No emails are sent (by design)
- All data is stored securely in Google services

## Troubleshooting

### Common Issues

**Error: "Missing ) after argument list"**
- Solution: Use "Paste without formatting" when copying code
- Check for smart quotes (" " ' ') and replace with straight quotes (" ')

**Error: "Permission denied"**
- Solution: Re-run authorization process in Step 3.2
- Ensure "Execute as: Me" is selected

**Error: "Cannot create folder/sheet"**
- Solution: Verify IDs are correct
- Ensure Google account has edit access to Sheet and Drive folder

**Web App returns error**
- Solution: Check Apps Script logs (View → Logs)
- Verify all constants are properly configured

### Support

If you encounter issues:
1. Check the Apps Script execution logs (View → Executions)
2. Verify all IDs and URLs are correctly copied
3. Ensure proper authorization was completed
4. Test with a simple GET request first

## Security Notes

- Web App is set to "Anyone" access but requires proper payload structure
- Resume files are stored privately in Google Drive
- Optional shared secret adds extra security layer
- No sensitive data is logged or exposed

---

**Next Steps**: Once you complete this setup, provide the Web App URL to integrate with your website.