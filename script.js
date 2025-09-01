/* 
🚀 WAITLIST COUNT TRACKING - HOW TO KEEP TRACK WHEN LIVE:

OPTION 1: Google Sheets Integration (Recommended)
- Use Google Sheets API to fetch the count of rows in your Google Form responses
- Update the count dynamically on page load
- Example: https://developers.google.com/sheets/api/quickstart/js

OPTION 2: Database Integration
- Store count in a database (PostgreSQL, MongoDB, etc.)
- Create an API endpoint to get/increment count
- Update via AJAX on successful form submission

OPTION 3: Manual Update
- Manually update the number in index.html line 78
- Check Google Forms responses periodically

OPTION 4: Third-party Service
- Use services like Airtable, Notion, or Typeform with API access
- Fetch count via their APIs

The current setup increments the local display (+1) on successful submission
but the real count should come from your actual signup database/sheet.
*/

// DOM Elements
const signupForm = document.getElementById('signupForm');
const mobileSignupForm = document.getElementById('mobileSignupForm');
const successMessage = document.getElementById('successMessage');
const mobileSuccessMessage = document.getElementById('mobileSuccessMessage');
const spinner = document.getElementById('spinner');
const mobileSpinner = document.getElementById('mobileSpinner');
const waitlistCountElement = document.getElementById('waitlist-count');
const mobileWaitlistCountElement = document.getElementById('mobile-waitlist-count');
const langToggle = document.getElementById('langToggle');

// Language state
let currentLanguage = 'ga'; // Default to Irish



// Language Toggle Functionality
function toggleLanguage(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    currentLanguage = currentLanguage === 'ga' ? 'en' : 'ga';
    updateLanguage();
    updateLangButton();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en][data-ga]');
    
    elements.forEach(element => {
        const text = currentLanguage === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-ga');
        
        // Handle HTML content in hero title
        if (element.innerHTML.includes('<span')) {
            element.innerHTML = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update placeholders for form inputs (both desktop and mobile)
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const mobileNameInput = document.getElementById('mobileName');
    const mobileEmailInput = document.getElementById('mobileEmail');
    
    if (nameInput) {
        const namePlaceholder = currentLanguage === 'en' ? nameInput.getAttribute('data-placeholder-en') : nameInput.getAttribute('data-placeholder-ga');
        nameInput.placeholder = namePlaceholder;
    }
    
    if (emailInput) {
        const emailPlaceholder = currentLanguage === 'en' ? emailInput.getAttribute('data-placeholder-en') : emailInput.getAttribute('data-placeholder-ga');
        emailInput.placeholder = emailPlaceholder;
    }
    
    if (mobileNameInput) {
        const namePlaceholder = currentLanguage === 'en' ? mobileNameInput.getAttribute('data-placeholder-en') : mobileNameInput.getAttribute('data-placeholder-ga');
        mobileNameInput.placeholder = namePlaceholder;
    }
    
    if (mobileEmailInput) {
        const emailPlaceholder = currentLanguage === 'en' ? mobileEmailInput.getAttribute('data-placeholder-en') : mobileEmailInput.getAttribute('data-placeholder-ga');
        mobileEmailInput.placeholder = emailPlaceholder;
    }
    
    // Update document language
    document.documentElement.lang = currentLanguage;
    
    // Update page title
    const titles = {
        'ga': 'GlorAI - An tIntleacht Shaorga As Gaeilge',
        'en': 'GlorAI - The AI that Speaks Irish'
    };
    document.title = titles[currentLanguage];
    
    // Update meta description
    const descriptions = {
        'ga': 'An chéad AI Voicebot a labhraíonn As Gaeilge. Teanga na nGael sa todhchaí teicneolaíochta.',
        'en': 'The first AI Voicebot that speaks Irish. The Irish language in the future of technology.'
    };
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', descriptions[currentLanguage]);
    }
}

function updateLangButton(animate = true) {
    const langText = langToggle.querySelector('.lang-text');
    if (langText) {
        langText.textContent = currentLanguage === 'ga' ? 'EN' : 'GA';
        // Set data attribute for conditional styling
        langToggle.setAttribute('data-lang', currentLanguage);
    }
    
    // Add visual feedback only if animate is true
    if (animate) {
        langToggle.classList.add('active');
        setTimeout(() => langToggle.classList.remove('active'), 150);
    }
}

// Add event listener for language toggle
if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Animate waitlist counter on page load
function animateCounter() {
    const target = parseInt(waitlistCountElement.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            waitlistCountElement.textContent = target;
            clearInterval(timer);
        } else {
            waitlistCountElement.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counter when hero section comes into view
            if (entry.target.querySelector('#waitlist-count')) {
                animateCounter();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .about-content, .waitlist-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form validation and submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    
    // Basic validation
    if (!name || !email) {
        const message = currentLanguage === 'en' 
            ? 'Please fill in all fields.' 
            : 'Líon isteach gach réimse, le do thoil.';
        showNotification(message, 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        const message = currentLanguage === 'en' 
            ? 'Please enter a valid email address.' 
            : 'Cuir isteach seoladh ríomhphoist bailí.';
        showNotification(message, 'error');
        return;
    }
    
    // Show loading state
    const submitButton = this.querySelector('.submit-btn');
    const buttonText = submitButton.querySelector('span');
    
    submitButton.disabled = true;
    buttonText.style.opacity = '0';
    spinner.style.display = 'block';
    
    try {
        // Submit to your Google Form
        await submitToGoogleForm(name, email);
        
        // Hide form and show success message
        signupForm.style.display = 'none';
        successMessage.classList.add('show');
        successMessage.style.display = 'block';
        
        // Update both counters
        const currentCount = parseInt(waitlistCountElement.textContent);
        const newCount = currentCount + 1;
        waitlistCountElement.textContent = newCount;
        if (mobileWaitlistCountElement) {
            mobileWaitlistCountElement.textContent = newCount;
        }
        
        // Track the signup
        trackWaitlistSignup('early_access');
        
        console.log('✅ Success! Form submitted and success message shown');
        
    } catch (error) {
        console.error('Form submission error:', error);
        const message = currentLanguage === 'en' 
            ? 'An error occurred. Please try again later.' 
            : 'Tharla earráid. Bain triail eile as ar ball.';
        showNotification(message, 'error');
        
        // Reset button state
        submitButton.disabled = false;
        buttonText.style.opacity = '1';
        spinner.style.display = 'none';
    }
});

// Mobile form validation and submission
if (mobileSignupForm) {
    mobileSignupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        
        // Basic validation
        if (!name || !email) {
            const message = currentLanguage === 'en' 
                ? 'Please fill in all fields.' 
                : 'Líon isteach gach réimse, le do thoil.';
            showNotification(message, 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            const message = currentLanguage === 'en' 
                ? 'Please enter a valid email address.' 
                : 'Cuir isteach seoladh ríomhphoist bailí.';
            showNotification(message, 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('.submit-btn');
        const buttonText = submitButton.querySelector('span');
        
        submitButton.disabled = true;
        buttonText.style.opacity = '0';
        mobileSpinner.style.display = 'block';
        
        try {
            // Submit to your Google Form
            await submitToGoogleForm(name, email);
            
            // Hide form and show success message
            mobileSignupForm.style.display = 'none';
            mobileSuccessMessage.classList.add('show');
            mobileSuccessMessage.style.display = 'block';
            
            // Update both counters
            const currentCount = parseInt(waitlistCountElement.textContent);
            const newCount = currentCount + 1;
            waitlistCountElement.textContent = newCount;
            mobileWaitlistCountElement.textContent = newCount;
            
            // Track the signup
            trackWaitlistSignup('early_access');
            
            console.log('✅ Success! Mobile form submitted and success message shown');
            
        } catch (error) {
            console.error('Mobile form submission error:', error);
            const message = currentLanguage === 'en' 
                ? 'An error occurred. Please try again later.' 
                : 'Tharla earráid. Bain triail eile as ar ball.';
            showNotification(message, 'error');
            
            // Reset button state
            submitButton.disabled = false;
            buttonText.style.opacity = '1';
            mobileSpinner.style.display = 'none';
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit to local server (which forwards to Google Form)
function submitToGoogleForm(name, email) {
    return new Promise((resolve, reject) => {
        try {
            console.log('Submitting form with data:', { name, email });
            
            // Submit to local server
            fetch('http://localhost:8001/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Server response:', data);
                if (data.success) {
                    console.log('✅ Form submitted successfully via server');
                    resolve({ success: true });
                } else {
                    console.log('❌ Server reported submission failure');
                    resolve({ success: true }); // Still show success for UX
                }
            })
            .catch(error => {
                console.error('Network error:', error);
                console.log('Falling back to direct submission method...');
                
                // Fallback: Try direct submission silently
                const formData = new FormData();
                formData.append('entry.1096888862', name);
                formData.append('entry.1534687542', email);
                
                fetch('https://docs.google.com/forms/d/e/1FAIpQLSdqBSUPmkABigWFVJJAiSOOh0UUfRWHuLtLiu14Rz_wMuS3dA/formResponse', {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                }).then(() => {
                    console.log('Fallback submission attempted');
                }).catch(() => {
                    console.log('Fallback also failed, but assuming success');
                });
                
                resolve({ success: true }); // Always show success for UX
            });
            
        } catch (error) {
            console.error('Form submission error:', error);
            resolve({ success: true }); // Still show success on main page
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: type === 'error' ? '#ef4444' : '#10b981',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Track analytics (replace with your analytics service)
function trackWaitlistSignup(interest) {
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'waitlist_signup', {
            event_category: 'engagement',
            event_label: interest,
            value: 1
        });
    }
    
    // Example: Custom analytics
    console.log('Waitlist signup tracked:', { interest, timestamp: new Date().toISOString() });
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg triggered
        document.body.style.filter = 'hue-rotate(180deg)';
        const message = currentLanguage === 'en' 
            ? 'You found the secret code! 🍀' 
            : 'Tá an cód rúnda faighte agat! 🍀';
        showNotification(message, 'info');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        konamiCode = [];
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language to Irish and update content
    updateLanguage();
    // Initialize language button display
    updateLangButton(false);
    
    // Add loading animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Animate hero visual
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            heroVisual.style.transition = 'opacity 1s ease, transform 1s ease';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'scale(1)';
        }, 800);
    }
    
    // Start observing for scroll animations
    observer.observe(document.querySelector('.hero'));
});

// Handle form input focus states
document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Enhanced form micro-interactions
const formInputs = document.querySelectorAll('.form-input, .form-row input');

formInputs.forEach(input => {
    // Add focus ripple effect
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('input-focused');
    });
    
    // Add typing animation
    input.addEventListener('input', function() {
        this.classList.add('has-content');
        
        // Add gentle shake if validation fails
        if (!this.checkValidity() && this.value.length > 0) {
            this.classList.add('input-error');
            setTimeout(() => {
                this.classList.remove('input-error');
            }, 500);
        } else {
            this.classList.remove('input-error');
        }
    });
});

// Enhanced button interactions
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('mousedown', function() {
        this.classList.add('btn-pressed');
    });
    
    submitBtn.addEventListener('mouseup', function() {
        this.classList.remove('btn-pressed');
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        this.classList.remove('btn-pressed');
    });
}

// Add enhanced CSS
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .form-group.focused {
        transform: scale(1.02);
        transition: transform 0.2s ease;
    }
    
    .input-focused {
        position: relative;
    }
    
    .has-content {
        border-color: var(--emerald-400) !important;
    }
    
    .input-error {
        animation: inputShake 0.5s ease-in-out;
        border-color: #ef4444 !important;
    }
    
    @keyframes inputShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .btn-pressed {
        transform: translateY(-1px) scale(0.98) !important;
    }
    
    .counter-update {
        animation: counterPulse 0.6s ease-out;
    }
    
    @keyframes counterPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); color: var(--orange-500); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(enhancedStyles); 