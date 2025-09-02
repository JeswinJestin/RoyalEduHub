# Google Apps Script Setup Guide for Royal EduHub

This guide will help you set up a reliable form submission system using Google Apps Script that automatically saves responses to Google Sheets and sends email notifications.

## 🎯 Benefits of This Solution

- ✅ **100% Reliable**: No CORS issues or browser restrictions
- ✅ **Real-time Updates**: Instant data saving to Google Sheets
- ✅ **Email Notifications**: Get notified immediately when forms are submitted
- ✅ **Data Backup**: All responses safely stored in Google Sheets
- ✅ **Easy Management**: View and manage responses in familiar Google Sheets interface

## 📋 Step-by-Step Setup

### Step 1: Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Replace the default `Code.gs` content with the code from `google-apps-script/Code.gs`
4. Save the project with a name like "Royal EduHub Form Handler"

### Step 2: Create Google Sheets for Responses

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Royal EduHub Form Responses"
4. Copy the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

### Step 3: Configure the Script

1. In your Google Apps Script project, update these constants:
   ```javascript
   const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Paste your sheet ID
   const NOTIFICATION_EMAIL = 'your-email@example.com'; // Your email address
   ```

### Step 4: Test the Setup

1. In Google Apps Script, click **"Run"** and select `testSetup`
2. Grant necessary permissions when prompted
3. Check the execution log for success message
4. Verify that a test row was added to your Google Sheet

### Step 5: Deploy as Web App

1. Click **"Deploy"** → **"New Deployment"**
2. Choose **"Web app"** as the type
3. Set the following configuration:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **"Deploy"**
5. Copy the **Web app URL** (you'll need this for the React app)

### Step 6: Update React Application

Update your `src/services/emailService.js` file:

```javascript
// Add this constant at the top
const GOOGLE_APPS_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';

// Add this new function
export const submitToGoogleAppsScript = async (formData) => {
  try {
    console.log('🚀 Submitting to Google Apps Script...');
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Google Apps Script submission successful');
      return {
        success: true,
        message: 'Form submitted successfully via Google Apps Script',
        method: 'google_apps_script',
        data: result
      };
    } else {
      throw new Error(result.message || 'Google Apps Script submission failed');
    }
    
  } catch (error) {
    console.error('❌ Google Apps Script submission failed:', error);
    throw error;
  }
};
```

## 🔧 Troubleshooting

### Common Issues and Solutions

1. **"Script function not found" error**
   - Make sure you've saved the script after pasting the code
   - Verify the function names match exactly

2. **"Permission denied" error**
   - Run the `testSetup` function first to grant permissions
   - Make sure you're signed in to the correct Google account

3. **"Spreadsheet not found" error**
   - Double-check the SHEET_ID in your script
   - Ensure the spreadsheet is accessible by your Google account

4. **No email notifications**
   - Verify the NOTIFICATION_EMAIL is correct
   - Check your spam folder
   - Ensure Gmail API is enabled (usually automatic)

## 📊 Managing Responses

### Google Sheets Features

- **Real-time Updates**: New submissions appear instantly
- **Sorting & Filtering**: Organize responses by date, grade, subject, etc.
- **Data Validation**: Ensure data quality with built-in validation
- **Charts & Analytics**: Create visual reports of your enquiries
- **Export Options**: Download as Excel, PDF, or CSV

### Response Columns

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| Student Name | Name of the student |
| Parent Name | Name of the parent/guardian |
| Email | Contact email address |
| Phone | Contact phone number |
| Grade | Student's current grade |
| Subjects | Subjects of interest |
| Message | Additional message from enquirer |
| Source | How the form was submitted |
| Status | Processing status (New/Contacted/Enrolled) |

## 🔄 Integration with Current System

This Google Apps Script solution works as a **primary method** alongside your existing Google Forms setup:

1. **Primary**: Google Apps Script (most reliable)
2. **Fallback**: Google Forms (if Apps Script fails)
3. **Backup**: Local storage (prevents data loss)

## 📈 Next Steps

1. Set up the Google Apps Script following this guide
2. Test with a few form submissions
3. Monitor the Google Sheet for incoming responses
4. Set up additional email notifications if needed
5. Create automated follow-up workflows in Google Sheets

## 🆘 Support

If you encounter any issues:

1. Check the Google Apps Script execution logs
2. Verify all URLs and IDs are correct
3. Test the `testSetup` function
4. Ensure proper permissions are granted

This solution provides a robust, scalable way to handle form submissions with real-time tracking and notifications!