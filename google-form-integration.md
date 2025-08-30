# Google Form Integration Guide

## Steps to Connect Your Landing Page to Google Forms

### 1. Create a Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with fields:
   - Name (Short answer)
   - Email (Short answer)

### 2. Get Form Details
1. Click "Send" → "Link" tab
2. Copy the form URL (looks like: `https://docs.google.com/forms/d/e/FORM_ID/viewform`)
3. Change `viewform` to `formResponse` in the URL
4. This gives you: `https://docs.google.com/forms/d/e/FORM_ID/formResponse`

### 3. Get Field Entry IDs
1. Open your form in edit mode
2. Right-click on the Name field → "Inspect Element"
3. Look for `name="entry.XXXXXXXXX"` - copy this number
4. Repeat for Email field
5. Note these entry IDs

### 4. Update the JavaScript Code
Replace the `simulateFormSubmission` function in `script.js`:

```javascript
function submitToGoogleForm(name, email) {
    const formUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
    const formData = new FormData();
    
    // Replace with your actual entry IDs
    formData.append('entry.YOUR_NAME_ENTRY_ID', name);
    formData.append('entry.YOUR_EMAIL_ENTRY_ID', email);
    
    return fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Google Forms
    });
}
```

### 5. Replace in the Form Handler
In the `signupForm.addEventListener` section, replace:
```javascript
await simulateFormSubmission(name, email);
```

With:
```javascript
await submitToGoogleForm(name, email);
```

### 6. Test the Integration
1. Submit a test form entry
2. Check your Google Form responses to confirm it's working
3. The form will submit silently due to `no-cors` mode

## Notes
- Google Forms submissions with `no-cors` don't return success/failure status
- You may want to always show success message after submission
- Consider adding a backup notification system for important signups
- Test thoroughly before going live

## Alternative: Use Google Apps Script
For more control, consider using Google Apps Script as a proxy to handle form submissions and return proper responses. 