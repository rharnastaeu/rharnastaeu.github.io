/**
 * Contact module
 * Handles contact form validation and submission
 */

function initContact() {
    // Get the contact form
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Add form submission event listener
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', () => {
            // Remove error styling as user types
            if (input.classList.contains('error')) {
                input.classList.remove('error');
                const errorMessage = input.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
}

/**
 * Handles form submission
 * @param {Event} e - Form submission event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form elements
    const form = e.target;
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const subjectInput = form.querySelector('#subject');
    const messageInput = form.querySelector('#message');
    
    // Validate all inputs
    const nameValid = validateInput({ target: nameInput });
    const emailValid = validateInput({ target: emailInput });
    const subjectValid = validateInput({ target: subjectInput });
    const messageValid = validateInput({ target: messageInput });
    
    // If all inputs are valid, process the form
    if (nameValid && emailValid && subjectValid && messageValid) {
        // In a real application, this would send the form data to a server
        // For this demo, we'll simulate a successful form submission
        
        // Create form data object
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Log the form data (for demo purposes)
        console.log('Form submission data:', formData);
        
        // Show success message
        showFormMessage('success', 'Your message has been sent successfully! I will get back to you soon.');
        
        // Reset form
        form.reset();
    } else {
        // Show error message
        showFormMessage('error', 'Please fix the errors in the form before submitting.');
    }
}

/**
 * Validates a form input
 * @param {Event} e - Input blur event
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules based on input type
    switch (input.id) {
        case 'name':
            if (value === '') {
                isValid = false;
                errorMessage = 'Please enter your name';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === '') {
                isValid = false;
                errorMessage = 'Please enter your email address';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'subject':
            if (value === '') {
                isValid = false;
                errorMessage = 'Please enter a subject';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Subject must be at least 3 characters';
            }
            break;
            
        case 'message':
            if (value === '') {
                isValid = false;
                errorMessage = 'Please enter your message';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
            
        default:
            break;
    }
    
    // Add error class and message if invalid
    if (!isValid) {
        input.classList.add('error');
        
        // Create and append error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        input.parentElement.appendChild(errorElement);
    } else {
        input.classList.remove('error');
    }
    
    return isValid;
}

/**
 * Displays a form submission message
 * @param {string} type - Message type (success/error)
 * @param {string} message - Message content
 */
function showFormMessage(type, message) {
    // Get the contact form
    const form = document.getElementById('contactForm');
    
    // Check if message already exists
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Add appropriate icon
    const icon = document.createElement('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
    } else {
        icon.className = 'fas fa-exclamation-circle';
    }
    messageElement.prepend(icon);
    
    // Insert message before the form
    form.parentElement.insertBefore(messageElement, form);
    
    // Auto remove message after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
} 