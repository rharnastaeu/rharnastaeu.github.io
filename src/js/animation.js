/**
 * Animation module
 * Handles scroll animations and transitions
 */

function initAnimation() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Observe elements for animation
    if (animatedElements.length > 0) {
        observeElements(animatedElements);
    }
    
    // Force animate all project cards and skill categories
    setTimeout(() => {
        console.log('Force animating project cards and skill categories');
        document.querySelectorAll('.project-card, .skill-category').forEach(el => {
            el.classList.add('animated');
        });
    }, 1000);
    
    // Type animation for hero title name
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) {
        setTimeout(() => {
            // Make name static, not animated
            heroTitle.textContent = heroTitle.textContent;
        }, 500);
    }
    
    // Advanced typing animation for subtitle with multiple phrases
    initTypingAnimation();
}

/**
 * Initializes the typing animation for the subtitle with multiple phrases
 * that rotate randomly, typing and deleting each phrase
 */
function initTypingAnimation() {
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (!subtitleElement) return;
    
    // Array of professional titles to display
    const titles = [
        "Software Developer",
        "Programmer",
        "WEB3 Builder",
        "Project Manager",
        "Full-Stack Developer",
        "DeFi Specialist"
    ];
    
    let currentTitleIndex = -1;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed (milliseconds)
    
    // Function to get the next title, ensuring it's different from the current one
    function getNextTitle() {
        // Generate a random index that's different from the current one
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * titles.length);
        } while (randomIndex === currentTitleIndex && titles.length > 1);
        
        currentTitleIndex = randomIndex;
        return titles[currentTitleIndex];
    }
    
    // The main typing effect function
    function typeEffect() {
        // Get the full title from the array
        const fullTitle = currentTitleIndex === -1 ? getNextTitle() : titles[currentTitleIndex];
        
        // Determine typing speed based on state
        let speed = typingSpeed;
        
        if (isDeleting) {
            // Faster when deleting
            speed = typingSpeed / 2;
            // Remove one character
            currentText = fullTitle.substring(0, currentText.length - 1);
        } else {
            // Add one character
            currentText = fullTitle.substring(0, currentText.length + 1);
        }
        
        // Update the element with current text and cursor
        subtitleElement.textContent = currentText;
        
        // If we're not deleting and reached the full text
        if (!isDeleting && currentText === fullTitle) {
            // Pause at the end of typing
            speed = 1500; // Longer pause when completed a word
            isDeleting = true;
        } 
        // If we're deleting and reached empty string
        else if (isDeleting && currentText === '') {
            isDeleting = false;
            // Move to next title
            currentTitleIndex = -1; // Forces a new random title
            // Slight pause before typing next word
            speed = 500;
        }
        
        // Add some natural variation to typing speed
        const speedVariation = Math.random() * 50;
        
        // Schedule the next update
        setTimeout(typeEffect, speed + speedVariation);
    }
    
    // Start the typing effect
    typeEffect();
}

/**
 * Observe elements for scroll animations using Intersection Observer API
 * @param {NodeList} elements - Elements to observe
 */
function observeElements(elements) {
    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust the trigger point
    });
    
    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Add animation classes to elements in the portfolio
 * This runs on DOMContentLoaded to set up animations
 */
function addAnimationClasses() {
    // Elements that should animate on scroll
    const sectionsToAnimate = document.querySelectorAll('section:not(.hero)');
    sectionsToAnimate.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // Adding specific animations to elements
    const elementsToAnimate = [
        { selector: '.hero-content', animation: 'fade-in-left' },
        { selector: '.hero-image', animation: 'fade-in-right' },
        { selector: '.about-text', animation: 'fade-in-up' },
        { selector: '.personal-info', animation: 'fade-in-up' },
        { selector: '.timeline', animation: 'fade-in-up' },
        { selector: '.projects-filter', animation: 'fade-in-down' },
        { selector: '.projects-grid', animation: 'fade-in-up' },
        { selector: '.skills-container', animation: 'fade-in-up' },
        { selector: '.contact-info', animation: 'fade-in-left' },
        { selector: '.contact-form', animation: 'fade-in-right' }
    ];
    
    elementsToAnimate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(element => {
            element.classList.add('animate-on-scroll', item.animation);
        });
    });
}

// Run the setup
addAnimationClasses(); 