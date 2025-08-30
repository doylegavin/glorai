# GlorAI Landing Page

A beautiful, responsive landing page for GlorAI - the first AI Voicebot that speaks Irish (As Gaeilge).

## Features

### 🎨 Design
- **Modern, clean design** with Irish-inspired color palette (emerald green and orange)
- **Fully responsive** - works perfectly on desktop, tablet, and mobile
- **Smooth animations** and micro-interactions for enhanced user experience
- **Irish cultural elements** including shamrock icon and Ireland outline SVG

### 🍀 Irish Language Integration
- **Authentic Irish content** throughout the page
- **Cultural authenticity** with proper Irish phrases and terminology
- **Bilingual approach** where appropriate for broader accessibility

### ⚡ Interactive Features
- **Animated voice visualization** with sound wave animation
- **Smooth scrolling** navigation between sections
- **Auto-hiding header** on scroll for better content focus
- **Form validation** with Irish language error messages
- **Success animations** for form submission
- **Scroll-triggered animations** for content reveal

### 📝 Waitlist Functionality
- **Complete form handling** with validation
- **Real-time counter** showing current signups
- **Success/error notifications** in Irish
- **Analytics tracking** ready for integration
- **Loading states** and smooth transitions

## File Structure

```
GlorAI/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling and responsive design
├── script.js       # Interactive functionality and animations
└── README.md       # This documentation
```

## Sections

### 1. Navigation Header
- Fixed header with blur effect
- Logo with shamrock icon
- Navigation links in Irish
- Call-to-action button

### 2. Hero Section
- Compelling headline in Irish and English
- Animated voice visualization
- Primary call-to-action
- Live waitlist counter

### 3. Features Section
- 6 key features showcasing the AI's capabilities
- Hover animations and icons
- Focus on Irish language preservation and technology

### 4. About Section
- Mission statement and vision
- Ireland outline illustration
- Key value propositions

### 5. Waitlist Section
- Beautiful form design
- Validation and error handling
- Success state management
- Interest categorization

### 6. Footer
- Brand information
- Legal links (ready for expansion)
- Clean, minimal design

## Customization Guide

### Colors
The color palette is defined in CSS custom properties in `styles.css`:

```css
:root {
    --emerald-500: #10b981;  /* Primary green */
    --emerald-600: #059669;  /* Darker green */
    --orange-600: #ea580c;   /* Irish orange accent */
    /* ... more colors */
}
```

### Content
Update the Irish text in `index.html` to match your specific messaging. Key areas:
- Hero title and description
- Feature descriptions
- About section content
- Form labels and placeholders

### Analytics Integration
Replace the placeholder analytics function in `script.js`:

```javascript
function trackWaitlistSignup(interest) {
    // Replace with your analytics service
    // Example: Google Analytics, Mixpanel, etc.
}
```

### Form Backend
Replace the simulated form submission with your actual API:

```javascript
function simulateFormSubmission(name, email, interest) {
    // Replace with actual API call to your backend
    return fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, interest })
    });
}
```

## Technical Features

### Performance
- **Optimized CSS** with modern features and efficient selectors
- **Minimal JavaScript** for fast loading
- **Font optimization** with preconnect headers
- **Responsive images** and scalable graphics

### Accessibility
- **Semantic HTML** structure
- **Proper heading hierarchy**
- **Focus management** for keyboard navigation
- **Screen reader friendly** content

### Browser Support
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **CSS Grid and Flexbox** for layout
- **CSS Custom Properties** for theming
- **ES6+ JavaScript** features

## Quick Start

1. **Open the page**: Simply open `index.html` in a web browser
2. **Test the form**: Try submitting the waitlist form to see animations
3. **Customize content**: Edit the Irish text to match your needs
4. **Add backend**: Connect the form to your waitlist API
5. **Deploy**: Upload to your web hosting service

## Easter Eggs

- **Konami Code**: Try the classic ↑↑↓↓←→←→BA sequence for a surprise!
- **Smooth animations**: Watch for subtle hover effects throughout

## Irish Language Notes

The page uses authentic Irish language throughout:
- **"As Gaeilge"** - In Irish (the language)
- **"Cláraigh"** - Register/Sign up
- **"Gnéithe"** - Features
- **"Faoi"** - About
- **"Go raibh maith agat"** - Thank you

## Browser Testing

Recommended testing in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Consider adding:
- **Multilingual support** (Irish/English toggle)
- **Dark mode** theme option
- **More detailed animations**
- **Video testimonials** section
- **FAQ section**
- **Blog integration**

---

**Slán go fóill!** (Goodbye for now!) 🍀

Built with love for the Irish language and modern web technology. 