# Google Forms Integration Setup Guide

This guide will help you integrate your contact form with Google Forms to automatically store submissions in Google Sheets and send email notifications.

## Overview

When a user submits the contact form on your website, the data will be:
1. **Automatically stored** in a Google Sheets spreadsheet
2. **Email notifications sent** to your specified email address
3. **Organized and searchable** in Google Sheets for easy management

## Method 1: Direct Google Forms Integration (Recommended)

### Step 1: Create a Google Form

1. Go to [Google Forms](https://forms.google.com/)
2. Click "+ Blank" to create a new form
3. Add the following questions in **exact order**:
   - **Student's Name** (Short answer)
   - **Parent's Name** (Short answer)
   - **Email Address** (Short answer)
   - **Phone Number** (Short answer)
   - **Grade** (Multiple choice: Grade 5, Grade 6, Grade 7, Grade 8, Grade 9, Grade 10, Grade 11, Grade 12)
   - **Subject** (Multiple choice: Mathematics, Science, English, Coding, Multiple Subjects)
   - **Additional Message** (Paragraph)

### Step 2: Get Form ID and Entry IDs

1. **Get Form ID:**
   - In your Google Form, click "Send" button
   - Copy the form URL (looks like: `https://docs.google.com/forms/d/1ABC123DEF456/edit`)
   - The Form ID is the part between `/d/` and `/edit` (e.g., `1ABC123DEF456`)

2. **Get Entry IDs (Critical Step):**
   
   **Method A: Using Browser Developer Tools (Recommended)**
   
   **IMPORTANT: Make sure you're on the actual Google Form page, not Google Drive or Forms list!**
   
   1. **Navigate to your Google Form**:
      - Go to your Google Form's **preview URL** (should look like: `https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform`)
      - **NOT** the edit URL (which contains `/edit`)
      - **NOT** the Google Drive file list
   
   2. **Open Developer Tools**:
      - Right-click and select "Inspect" or press F12
      - Go to the "Network" tab in Developer Tools
      - **Important**: Clear the network log (🚫 button) and check "Preserve log"
   
   3. **Submit the Form**:
      - Fill out ALL required fields in your Google Form
      - Click the "Submit" button
      - **Watch the Network tab immediately after clicking Submit**
   
   4. **Find the formResponse Request**:
      - Look for a POST request to `formResponse` or containing `forms.google.com`
      - If you don't see it, try these filters:
        * Click "XHR" or "Fetch" filter buttons
        * Look for requests containing "entry" in the name
        * Look for any POST requests (not GET)
   
   5. **Extract Entry IDs**:
      - Click on the formResponse request (you should see it highlighted)
      - Look for tabs at the top of the details panel: "Headers", "Payload", "Preview", "Response", etc.
      - **Click on the "Payload" tab** (this is where the entry IDs are located)
      - If you don't see "Payload", try clicking on "Request" or "Form Data" tab instead
   - You'll see entries like:
     ```
     entry.123456789: Student Name
     entry.987654321: Parent Name
     entry.111222333: Email Address
     entry.444555666: Phone Number
     entry.777888999: Grade 5
     entry.000111222: Mathematics
     entry.333444555: Additional message
     ```
   
   **🚨 TROUBLESHOOTING: Can't find formResponse in Network tab?**
   
   If you don't see any `formResponse` request after submitting, check these:
   
   ✅ **Verify you're on the correct page**:
   - URL should be: `https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform`
   - Should NOT contain `/edit` or be on Google Drive
   - The page should show your form fields, not the form builder
   
   ✅ **Check your form submission**:
   - Make sure you filled out ALL required fields (marked with *)
   - Click the actual "Submit" button (not "Clear form")
   - You should see a "Your response has been recorded" message
   
   ✅ **Network tab settings**:
   - Clear the network log before submitting (🚫 button)
   - Enable "Preserve log" checkbox
   - Try different filters: "All", "XHR", "Fetch", or "Doc"
   - Look for ANY POST requests after submission
   
   ✅ **Still not working?**
   - Try a different browser (Chrome, Firefox, Edge)
   - Disable browser extensions temporarily
   - Try incognito/private mode
   - Refresh the form page and try again
   
   **Method A Alternative: If Network tab still shows no requests**
   - The form might be using a different submission method or have restrictions
   - Try Method B (View Page Source) instead
   - Or use Method C (URL inspection) below
   
   **Method B: View Page Source**
   - Open your form in a new tab
   - Right-click and select "View Page Source"
   - Search for `entry.` in the source code (Ctrl+F)
   - You'll find entry IDs like `entry.123456789` for each field
   - Note down the entry IDs in the same order as your form fields
   
   **Method C: URL Inspection (If Methods A & B don't work)**
   - Fill out your Google Form completely
   - Before clicking Submit, right-click the Submit button
   - Select "Inspect Element"
   - Look for the `<form>` tag in the HTML
   - Find the `action` attribute - it contains the form URL
   - Copy this URL and look for entry IDs in the form structure
   - Alternatively, submit the form and check the URL parameters in the address bar
   
   **Important Notes:**
   - Entry IDs are unique to each form field
   - They must match exactly between your Google Form and your code
   - If you modify your Google Form, the entry IDs may change

### Step 3: Update Your Code

1. Open `src/services/emailService.js`
2. Replace `YOUR_GOOGLE_FORM_ID` with your actual Form ID
3. Replace the entry IDs with your actual entry IDs:

```javascript
// Example configuration:
const GOOGLE_FORM_ID = '1FAIpQLSccFaBuy1IWvEXmwI8vBO-AbUc7-7nSXd8zmLO1puuF_LHLfw'; // Your actual form ID

// Replace these with your actual entry IDs from Step 2:
formDataToSubmit.append('entry.123456789', formData.studentName); // Student Name field
formDataToSubmit.append('entry.987654321', formData.parentName);   // Parent Name field
formDataToSubmit.append('entry.111222333', formData.email);        // Email Address field
formDataToSubmit.append('entry.444555666', formData.phone);        // Phone Number field
formDataToSubmit.append('entry.777888999', formData.grade);        // Grade field (Grade 5-12)
formDataToSubmit.append('entry.000111222', formData.subject);      // Subject field
formDataToSubmit.append('entry.333444555', formData.message);      // Additional Message field
```

**⚠️ Critical: Make sure your Google Form has exactly these fields in this order:**
1. Student's Name (Short answer)
2. Parent's Name (Short answer) 
3. Email Address (Short answer)
4. Phone Number (Short answer)
5. Grade (Multiple choice: Grade 5, Grade 6, Grade 7, Grade 8, Grade 9, Grade 10, Grade 11, Grade 12)
6. Subject (Multiple choice: Mathematics, Science, English, Coding, Multiple Subjects)
7. Additional Message (Paragraph)

### Step 4: Set Up Email Notifications

1. In your Google Form, click the "Responses" tab
2. Click the three dots menu (⋮) and select "Get email notifications for new responses"
3. This will send you an email every time someone submits the form

### Step 5: Access Your Spreadsheet

1. In the "Responses" tab of your Google Form
2. Click the Google Sheets icon to create a linked spreadsheet
3. All form submissions will automatically appear in this spreadsheet
4. You can share this spreadsheet with team members for collaboration

## Method 2: Google Apps Script (Advanced - More Control)

For more advanced features like custom email templates and additional processing:

### Step 1: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Replace the default code with:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet (replace with your sheet ID)
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Student Name', 'Parent Name', 'Email', 
        'Phone', 'Grade', 'Subject', 'Message'
      ]);
    }
    
    // Add the form data
    sheet.appendRow([
      new Date(),
      data.studentName,
      data.parentName,
      data.email,
      data.phone,
      data.grade,
      data.subject,
      data.message
    ]);
    
    // Send email notification
    const emailBody = `
      New inquiry received:
      
      Student: ${data.studentName}
      Parent: ${data.parentName}
      Email: ${data.email}
      Phone: ${data.phone}
      Grade: ${data.grade}
      Subject: ${data.subject}
      Message: ${data.message}
      
      Submitted at: ${new Date()}
    `;
    
    MailApp.sendEmail({
      to: 'your-email@example.com', // Replace with your email
      subject: `New Inquiry from ${data.studentName}`,
      body: emailBody
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 2: Deploy as Web App

1. Click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy" and copy the Web App URL

### Step 3: Update Your Code

1. In `src/services/emailService.js`
2. Replace `YOUR_APPS_SCRIPT_WEB_APP_URL` with your actual Web App URL
3. Update the Contact component to use `submitToGoogleAppsScript` instead of `submitToGoogleForms`

## Testing Your Setup

1. **Test the form submission:**
   - Fill out your contact form on the website
   - Submit the form
   - Check if you receive an email notification
   - Verify the data appears in your Google Sheet

2. **Troubleshooting Entry ID Issues:**

   **Problem: "No entry ID found" or can't find formResponse in Network tab**
   - **Solution A**: Try Method B (View Page Source) - search for "entry." in the HTML
   - **Solution B**: Use Method C (URL Inspection) to find entry IDs in form structure
   - **Solution C**: Ensure your form is set to "Accept responses" and not in edit mode
   - **Solution D**: Clear browser cache and try again with a fresh form load
   - **Solution E**: Try using a different browser (Chrome, Firefox, Edge)
   - **Solution F**: Make sure you're using the preview URL, not the edit URL
   
   **Problem: Form submits but data doesn't appear in Google Sheets**
   - Check if your Google Form is linked to a Google Sheet
   - Verify the entry IDs match exactly (case-sensitive)
   - Ensure your form fields accept the data types being sent
   
   **Problem: Some fields are empty in Google Sheets**
   - Check that field names in your contact form match the expected values
   - Verify that dropdown options (Grade, Subject) match exactly
   - Ensure required fields are being filled out
   
   **Common Issues:**
   - Entry IDs change if you modify the Google Form structure
   - Form must be set to "Accept responses" (not "Not accepting responses")
   - CORS errors may occur - ensure you're using the correct form URL
   - Check browser console for any error messages
   - Verify all entry IDs are correct and properly formatted
   - Check your email spam folder for notifications

## Benefits of Google Forms Integration

✅ **Automatic Data Storage**: All submissions stored in Google Sheets
✅ **Email Notifications**: Instant notifications for new inquiries
✅ **Free Solution**: No cost for basic usage
✅ **Easy Management**: Sort, filter, and analyze data in Google Sheets
✅ **Collaboration**: Share spreadsheet with team members
✅ **Export Options**: Download data as Excel, CSV, etc.
✅ **Spam Protection**: Google's built-in spam filtering
✅ **Reliable**: Google's infrastructure ensures high uptime

## Data Management

### Organizing Your Data
- **Sort by date** to see newest inquiries first
- **Filter by subject** to categorize inquiries
- **Use conditional formatting** to highlight urgent inquiries
- **Create charts** to visualize inquiry trends

### Backup Your Data
- Regularly download your spreadsheet as backup
- Set up automatic backups using Google Drive sync
- Consider exporting to Excel for offline access

## Security Considerations

- Form submissions are validated and sanitized before sending
- Rate limiting prevents spam submissions
- Google Forms provides built-in spam protection
- Data is stored securely in Google's infrastructure
- Access to the spreadsheet can be controlled via Google Drive permissions

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Google Form is accepting responses
3. Ensure all entry IDs match your form fields
4. Test with a simple form submission first

## Next Steps

After setup:
1. Test the form thoroughly
2. Set up email filters to organize inquiries
3. Create a system for responding to inquiries
4. Consider setting up automated responses
5. Monitor and analyze inquiry patterns

## Quick Reference: Entry ID Checklist

**Before you start:**
✅ Create Google Form with exact field order (Student Name, Parent Name, Email, Phone, Grade, Subject, Message)
✅ Set Grade options to: Grade 5, Grade 6, Grade 7, Grade 8, Grade 9, Grade 10, Grade 11, Grade 12
✅ Set Subject options to: Mathematics, Science, English, Coding, Multiple Subjects

**To get Entry IDs:**
1. Open your Google Form in preview mode
2. Open Developer Tools (F12) → Network tab
3. Submit the form once with test data
4. Find the `formResponse` request
5. Copy the entry IDs from the Form Data section
6. Update `src/services/emailService.js` with your actual entry IDs

**Testing:**
✅ Submit a test form from your website
✅ Check Google Sheets for the data
✅ Verify email notification is received
✅ Confirm all fields are populated correctly

---

Your contact form is now fully integrated with Google Forms for automatic data storage and email notifications!