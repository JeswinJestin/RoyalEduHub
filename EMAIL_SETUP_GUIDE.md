# Email Setup Guide for Contact Form

This guide will help you set up email functionality for your contact form. You have three options to choose from:

## Option 1: Formspree (Recommended - Easiest Setup)

### Steps:
1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint URL (looks like: `https://formspree.io/f/xpznvqjr`)
5. Update the email service file:
   - Open `src/services/emailService.js`
   - Replace `'https://formspree.io/f/your_form_id'` with your actual Formspree URL

### Benefits:
- Free tier available (50 submissions/month)
- No API keys needed
- Automatic spam protection
- Email notifications to your inbox
- Easy setup

## Option 2: EmailJS (More Customizable)

### Steps:
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Create an email service (Gmail, Outlook, etc.)
4. Create an email template with these variables:
   - `{{student_name}}`
   - `{{parent_name}}`
   - `{{email}}`
   - `{{phone}}`
   - `{{grade}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{timestamp}}`
5. Get your Service ID, Template ID, and Public Key
6. Update the email service file:
   - Open `src/services/emailService.js`
   - Replace the EmailJS configuration variables:
     ```javascript
     const EMAILJS_SERVICE_ID = 'your_actual_service_id';
     const EMAILJS_TEMPLATE_ID = 'your_actual_template_id';
     const EMAILJS_PUBLIC_KEY = 'your_actual_public_key';
     ```
   - Replace `'your-email@example.com'` with your actual email
7. Update the Contact component to use EmailJS:
   - In `src/components/sections/Contact.js`
   - Change `sendContactEmailFormspree` to `sendContactEmail`

### Benefits:
- Free tier available (200 emails/month)
- Custom email templates
- Direct email sending
- More control over email content

## Option 3: Netlify Forms (If hosting on Netlify)

### Steps:
1. Deploy your site to Netlify
2. Add `data-netlify="true"` to your form element
3. Update the Contact component to use Netlify Forms:
   - In `src/components/sections/Contact.js`
   - Change `sendContactEmailFormspree` to `sendContactEmailNetlify`

### Benefits:
- Free with Netlify hosting
- Automatic form handling
- Spam protection included
- Form submissions in Netlify dashboard

## Current Configuration

The contact form is currently configured to use **Formspree**. To activate it:

1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form
3. Update the form endpoint in `src/services/emailService.js`
4. Replace `'https://formspree.io/f/your_form_id'` with your actual Formspree URL

## Testing

After setup:
1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the inquiry
4. Verify all form fields are included in the email

## Troubleshooting

### Common Issues:
- **CORS errors**: Make sure your domain is added to your email service settings
- **Emails not received**: Check spam folder and verify email service configuration
- **Form submission fails**: Check browser console for error messages

### Support:
- Formspree: [Documentation](https://help.formspree.io/)
- EmailJS: [Documentation](https://www.emailjs.com/docs/)
- Netlify Forms: [Documentation](https://docs.netlify.com/forms/setup/)

## Security Notes

- All form data is validated and sanitized before sending
- Rate limiting is implemented to prevent spam
- User input is escaped to prevent XSS attacks
- Email addresses are normalized and validated

Choose the option that best fits your needs and follow the setup instructions above.