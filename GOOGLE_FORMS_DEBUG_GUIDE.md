# Google Forms Integration Debug Guide

## Current Issue
The form shows "success" message but data is not appearing in Google Forms/Google Sheets.

## Debugging Steps

### 1. Check Browser Console
1. Open your website at `http://localhost:3001/contact`
2. Open browser Developer Tools (F12)
3. Go to the **Console** tab
4. Fill out and submit the form
5. Look for these debug messages:
   - "Submitting to Google Forms URL: ..."
   - "Form data being submitted: ..."
   - "FormData entries: ..."
   - "Response status: ..."
   - "Response type: ..."

### 2. Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Clear the network log
3. Submit the form
4. Look for a request to `docs.google.com/forms/d/e/.../formResponse`
5. Check the request status:
   - **200 OK**: Request successful
   - **4xx/5xx**: Error occurred

### 3. Verify Google Form Setup

#### Check Form URL
Your current form ID: `1FAlpQLSccFaBuy1lWvEXmwl8yBQ-AbUc7-7nSXd8zmLO1puuF_LHLfw`

Verify this matches your actual Google Form:
1. Go to your Google Form
2. Click "Send" button
3. Copy the link - it should contain the same ID

#### Verify Entry IDs
Current entry IDs in code:
- `entry.694510024` - Student Name
- `entry.369570048` - Parent Name  
- `entry.955661859` - Email Address
- `entry.1223616707` - Phone Number
- `entry.239154867` - Grade
- `entry.885264799` - Subject
- `entry.980357360` - Message

**To re-verify entry IDs:**
1. Open your Google Form
2. Right-click → "Inspect" or press F12
3. Go to **Network** tab
4. Fill out the form manually and submit
5. Look for `formResponse` request
6. Check the **Payload** or **Form Data** tab
7. Compare entry IDs with the ones in code

### 4. Common Issues & Solutions

#### Issue 1: Wrong Form ID
**Solution:** Update the `GOOGLE_FORM_ID` in `src/services/emailService.js`

#### Issue 2: Wrong Entry IDs
**Solution:** Update the entry IDs in `src/services/emailService.js`

#### Issue 3: Form Not Accepting Responses
**Solution:** 
1. Go to your Google Form
2. Click the "Settings" gear icon
3. Ensure "Accepting responses" is turned ON

#### Issue 4: CORS Issues
**Solution:** The code uses `mode: 'no-cors'` which should handle this, but if issues persist, we can implement a Google Apps Script solution.

## Alternative Solution: Google Apps Script

If direct form submission doesn't work, we can use Google Apps Script:

### Step 1: Create Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Create new project
3. Replace code with:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add data to sheet
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
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as type
3. Set execute as "Me"
4. Set access to "Anyone"
5. Deploy and copy the web app URL

### Step 3: Update Code
Replace the Google Forms submission with Apps Script URL in `emailService.js`.

## Testing Checklist

- [ ] Browser console shows debug messages
- [ ] Network tab shows successful request (200 status)
- [ ] Google Form ID matches actual form
- [ ] All entry IDs are correct
- [ ] Google Form is accepting responses
- [ ] Data appears in Google Sheets
- [ ] Email notifications are received (if configured)

## Need Help?

If you're still having issues:
1. Share the browser console output
2. Share the network request details
3. Verify your Google Form settings
4. Consider using the Google Apps Script alternative