/**
 * Royal EduHub Form Submission Handler - Enhanced Version
 * Features:
 * - Automatic yearly sheet creation
 * - Real-time form submission handling
 * - Email notifications with timestamps
 * - Data validation and error handling
 * - Data sorted by year with new sheets created annually
 */

// Configuration - UPDATED WITH YOUR NEW SHEET
const SHEET_ID = '1FeuoMrkljQ-gD9Ae1Q4CTL9_dBJd-wVeSLsvSSSiotA'; // Your new Google Sheet ID
const NOTIFICATION_EMAIL = 'royaleduhub24@gmail.com'; // Update this with your preferred email

/**
 * Main function to handle POST requests from the website
 */
function doPost(e) {
  try {
    console.log('Received POST request:', e);
    
    // Check if postData exists
    if (!e || !e.postData || !e.postData.contents) {
      console.log('No data received in request');
      return createResponse(false, 'No data received');
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed form data:', data);
    
    // Validate required fields
    if (!data.studentName || !data.email || !data.phone) {
      console.log('Missing required fields:', data);
      return createResponse(false, 'Missing required fields: studentName, email, or phone');
    }
    
    // Save to appropriate yearly sheet
    const result = saveToYearlySheet(data);
    
    if (result.success) {
      // Send email notification with enhanced error handling
      try {
        console.log('Sending email notification with data:', JSON.stringify(data));
        sendEmailNotification(data, result.sheetName);
        console.log('Email notification process completed');
      } catch (emailError) {
        console.error('Email notification failed, but form was saved:', emailError);
        // Continue with success response even if email fails
      }
      
      console.log('Form submission successful:', result);
      return createResponse(true, 'Form submitted successfully', {
        timestamp: result.timestamp,
        rowNumber: result.rowNumber,
        sheetName: result.sheetName
      });
    } else {
      console.log('Error saving to sheet:', result.error);
      return createResponse(false, 'Error saving form data: ' + result.error);
    }
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse(false, 'Server error: ' + error.message);
  }
}

/**
 * Handle GET requests for testing
 */
function doGet(e) {
  return createResponse(true, 'Royal EduHub Form Handler is running!', {
    timestamp: new Date().toISOString(),
    version: '2.0'
  });
}

/**
 * Save form data to yearly sheet
 */
function saveToYearlySheet(data) {
  try {
    console.log('saveToYearlySheet called with:', JSON.stringify(data));
    
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const currentYear = new Date().getFullYear();
    const sheetName = `Enquiries_${currentYear}`;
    
    // Get or create the yearly sheet
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      
      // Set up headers for new sheet
      const headers = [
        'Timestamp', 'Student Name', 'Parent Name', 'Email', 'Phone', 
        'Grade', 'Subjects', 'Message', 'Source', 'Status'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      
      console.log(`Created new yearly sheet: ${sheetName}`);
    }
    
    // Prepare the data row with guaranteed string values
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.studentName || '',
      data.parentName || '',
      data.email || '',
      data.phone || '',
      data.grade || '',
      data.subjects || '',
      data.message || '',
      data.source || 'Website Contact Form',
      'New'
    ];
    
    console.log('Row data to be saved:', rowData);
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    const rowNumber = sheet.getLastRow();
    
    // Format the new row
    const newRowRange = sheet.getRange(rowNumber, 1, 1, rowData.length);
    newRowRange.setBorder(true, true, true, true, true, true);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    console.log(`Data saved to ${sheetName}, row ${rowNumber}`);
    
    return {
      success: true,
      sheetName: sheetName,
      rowNumber: rowNumber,
      timestamp: timestamp.toISOString()
    };
    
  } catch (error) {
    console.error('Error saving to yearly sheet:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Send email notification for new form submission
 */
function sendEmailNotification(data, sheetName) {
  try {
    // Add validation to ensure data exists
    if (!data || typeof data !== 'object') {
      console.error('Invalid data passed to sendEmailNotification:', data);
      return;
    }
    
    // Ensure required fields exist with fallbacks
    const studentName = data.studentName || 'Unknown Student';
    const grade = data.grade || 'Grade not specified';
    const parentName = data.parentName || 'Not provided';
    const email = data.email || 'Not provided';
    const phone = data.phone || 'Not provided';
    const subjects = data.subjects || data.subject || 'Not specified';
    const message = data.message || 'No message provided';
    
    // Validate email configuration
    if (!NOTIFICATION_EMAIL || NOTIFICATION_EMAIL === 'your-email@example.com') {
      console.error('NOTIFICATION_EMAIL not properly configured');
      return;
    }
    
    const subject = `🔔 New Enquiry - ${studentName} (${grade})`;
    
    const body = `Dear Royal EduHub Team,\n\n` +
      `You have received a new enquiry through your website contact form.\n\n` +
      `👤 Student Information:\n` +
      `   • Student Name: ${studentName}\n` +
      `   • Parent Name: ${parentName}\n` +
      `   • Grade: ${grade}\n\n` +
      `📞 Contact Details:\n` +
      `   • Email: ${email}\n` +
      `   • Phone: ${phone}\n\n` +
      `📚 Academic Information:\n` +
      `   • Subjects: ${subjects}\n\n` +
      `💬 Message:\n` +
      `   ${message}\n\n` +
      `📊 Submission Details:\n` +
      `   • Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)\n` +
      `   • Saved to: ${sheetName}\n` +
      `   • Source: Website Contact Form\n\n` +
      `⚡ Action Required: Please follow up with the student/parent as soon as possible.\n\n` +
      `View all enquiries: https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
    
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body
    });
    
    console.log('Email notification sent successfully to:', NOTIFICATION_EMAIL);
    
  } catch (error) {
    console.error('Error sending email notification:', error);
    console.error('Data received:', JSON.stringify(data));
    // Don't throw error - email failure shouldn't stop form submission
  }
}

/**
 * Create standardized response object with proper CORS headers
 */
function createResponse(success, message, data = {}) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString(),
    ...data
  };
  
  const output = ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Removed addHeader calls (not supported by ContentService TextOutput)
  return output;
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  const output = ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
  
  // Removed addHeader calls (not supported by ContentService TextOutput)
  return output;
}

/**
 * Test function to verify the complete setup
 */
function testCompleteSetup() {
  try {
    console.log('🧪 Starting complete setup test...');
    
    const testData = {
      studentName: 'Test Student ' + new Date().getTime(),
      parentName: 'Test Parent',
      email: 'test@royaleduhub.com',
      phone: '+91-9876543210',
      grade: 'Grade 10',
      subjects: 'Mathematics, Science',
      message: 'This is a test submission to verify the complete setup'
    };
    
    // Test saving to yearly sheet
    const result = saveToYearlySheet(testData);
    
    if (result.success) {
      console.log('✅ Yearly sheet save test passed!');
      
      // Test email notification
      sendEmailNotification(testData, result.sheetName);
      console.log('✅ Email notification test completed!');
      
      return `✅ Complete setup test PASSED!\n\nDetails:\n- Sheet: ${result.sheetName}\n- Row: ${result.rowNumber}\n- Timestamp: ${result.timestamp}\n\nCheck your email at ${NOTIFICATION_EMAIL} for the notification.`;
    } else {
      console.log('❌ Setup test failed:', result.error);
      return '❌ Setup test FAILED: ' + result.error;
    }
    
  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
    return '❌ Test FAILED: ' + error.message;
  }
}

/**
 * Utility function to clean up old test data (optional)
 */
function cleanupTestData() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheets = spreadsheet.getSheets();
    
    sheets.forEach(sheet => {
      const data = sheet.getDataRange().getValues();
      const rowsToDelete = [];
      
      // Find rows with test data
      for (let i = 1; i < data.length; i++) {
        if (data[i][1] && data[i][1].toString().includes('Test Student')) {
          rowsToDelete.push(i + 1); // +1 because sheet rows are 1-indexed
        }
      }
      
      // Delete test rows (in reverse order to maintain row numbers)
      rowsToDelete.reverse().forEach(rowNum => {
        sheet.deleteRow(rowNum);
      });
      
      if (rowsToDelete.length > 0) {
        console.log(`Cleaned up ${rowsToDelete.length} test rows from ${sheet.getName()}`);
      }
    });
    
    return 'Test data cleanup completed';
    
  } catch (error) {
    console.log('Cleanup failed:', error.message);
    return 'Cleanup failed: ' + error.message;
  }
}