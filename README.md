# Portfolio Website - Technical Documentation & Developer Guide

Welcome to my personal portfolio website documentation. This project is built entirely from scratch using vanilla JavaScript, HTML5, and CSS3 – no frameworks, no shortcuts. Every line of code is handcrafted to showcase my skills and attention to detail. Below is the complete documentation and developer guide in one markdown block for easy copy-paste.

---

## Overview

This site demonstrates advanced frontend techniques:
- **Responsive Design:** A device-agnostic layout built with CSS Grid and Flexbox ensuring pixel-perfect views on mobile, tablet, and desktop.
- **Custom Theme System:** Dark/light themes implemented using CSS variables, with preferences stored in localStorage and smooth hardware-accelerated transitions.
- **WebP Animations:** Custom WebP animations for key sections (Card Index, Pencil, Briefcase, Graduation Cap) controlled by the Intersection Observer API so they play only once.
- **Interactive Contact System:** A custom popup for contact details that leverages the Clipboard API for effortless copying.
- **Terminal-Inspired UI:** A unique typing animation with variable speed, glitch effects, and retro monospace styling.
- **Optimized Performance:** Modular JavaScript, lazy-loaded assets, inlined critical CSS, and robust error handling.

---

## Technical Stack & Implementation

### Core Technologies
- **HTML5:** Semantic, accessible markup.
- **CSS3:** Custom properties, Flexbox, Grid, and animations.
- **Vanilla JavaScript:** Native DOM manipulation, async patterns, and modern APIs like Intersection Observer.

### Key Features

**Responsive Design Architecture:**  
Utilizes CSS Grid and Flexbox to create a fluid, adaptive layout. The design adapts gracefully to different breakpoints without fixed media queries.

**Theme System:**  
A custom dark/light theme is implemented using CSS variables. User preferences persist via localStorage, and hardware-accelerated transitions ensure smooth theme changes. The site also detects system preferences using `prefers-color-scheme`.

**WebP Animation Integration:**  
Custom WebP animations are incorporated into key sections. The Intersection Observer API ensures animations trigger only once, and `animation-iteration-count` is used programmatically to optimize performance.

```javascript
// Animation control using Intersection Observer API
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const webpImage = entry.target.querySelector('img');
            if (webpImage) {
                webpImage.addEventListener('load', () => {
                    webpImage.style.animationIterationCount = '1';
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});
```

**Interactive Contact System:**  
A custom-built popup displays contact details and uses the Clipboard API for seamless copying. The modal is built from scratch with proper focus management and supports various contact types (email, phone, links).

**Terminal-Inspired UI Elements:**  
Features a custom typing animation with variable speed and a blinking cursor. The design employs a retro monospace style enhanced with subtle glitch effects.

**Code Organization & Performance Optimizations:**  
The code is modularized across multiple JavaScript files with event delegation and lazy-loaded assets. Performance is further enhanced by deferring JS loading, inlining critical CSS, custom font strategies, and throttling animations. The site is tested across modern browsers including Chrome, Firefox, Safari, Edge, and mobile browsers.

**Future Roadmap:**  
- Implement server-side rendering for faster initial loads.
- Add Progressive Web App (PWA) capabilities.
- Automate the build process with asset optimization.

---

## Developer Guide

This section explains the inner workings of each module.

### Table of Contents
1. [Contact Module (`contact.js`)](#contact-module-contactjs)
2. [Animation Module (`animation.js`)](#animation-module-animationjs)
3. [Section Icons Animation Module (`animations.js`)](#section-icons-animation-module-animationsjs)
4. [Navigation Module (`navigation.js`)](#navigation-module-navigationjs)
5. [Experience Module (`experience.js`)](#experience-module-experiencejs)
6. [Main Module (`main.js`)](#main-module-mainjs)
7. [Conclusion & Final Notes](#conclusion--final-notes)

---

### Contact Module (`contact.js`)

**Purpose:**  
Handles contact form validation and submission, and manages interactive popups and clipboard operations.

**Key Functions:**
- **initContact():**  
  Grabs the contact form by ID and attaches event listeners for submission and input validation.
- **handleFormSubmit(e):**  
  Prevents default submission, validates inputs (name, email, subject, message), logs the data, shows a success message, and resets the form.
- **validateInput(e):**  
  Validates input fields (e.g., minimum length for names, valid email format) and displays error messages.
- **showFormMessage(type, message):**  
  Dynamically creates and displays a message (with an icon) above the form; success messages auto-remove after 5 seconds.

**Code Excerpt:**
```javascript
function initContact() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    contactForm.addEventListener('submit', handleFormSubmit);
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
                const errorMessage = input.parentElement.querySelector('.error-message');
                if (errorMessage) errorMessage.remove();
            }
        });
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const subjectInput = form.querySelector('#subject');
    const messageInput = form.querySelector('#message');
    
    const nameValid = validateInput({ target: nameInput });
    const emailValid = validateInput({ target: emailInput });
    const subjectValid = validateInput({ target: subjectInput });
    const messageValid = validateInput({ target: messageInput });
    
    if (nameValid && emailValid && subjectValid && messageValid) {
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };
        console.log('Form submission data:', formData);
        showFormMessage('success', 'Your message has been sent successfully! I will get back to you soon.');
        form.reset();
    } else {
        showFormMessage('error', 'Please fix the errors in the form before submitting.');
    }
}
```

---

### Animation Module (`animation.js`)

**Purpose:**  
Handles scroll-triggered animations and a dynamic typing effect for the hero subtitle.

**Key Functions:**
- **initAnimation():**  
  Observes elements with the `.animate-on-scroll` class to trigger animations, forces animation on specific elements after a delay, and starts the typing animation.
- **initTypingAnimation():**  
  Cycles through an array of professional titles with a realistic typing and deleting effect.
- **observeElements(elements):**  
  Uses the Intersection Observer API to trigger animations when elements enter the viewport.
- **addAnimationClasses():**  
  Automatically assigns animation classes to key sections when the DOM is ready.

**Code Excerpt:**
```javascript
function initAnimation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        observeElements(animatedElements);
    }
    setTimeout(() => {
        document.querySelectorAll('.project-card, .skill-category').forEach(el => {
            el.classList.add('animated');
        });
    }, 1000);
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) {
        setTimeout(() => { heroTitle.textContent = heroTitle.textContent; }, 500);
    }
    initTypingAnimation();
}

function initTypingAnimation() {
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (!subtitleElement) return;
    const titles = ["Software Developer", "Programmer", "WEB3 Builder", "Project Manager", "Full-Stack Developer", "DeFi Specialist"];
    let currentTitleIndex = -1, currentText = '', isDeleting = false, typingSpeed = 100;
    
    function getNextTitle() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * titles.length);
        } while (randomIndex === currentTitleIndex && titles.length > 1);
        currentTitleIndex = randomIndex;
        return titles[currentTitleIndex];
    }
    
    function typeEffect() {
        const fullTitle = currentTitleIndex === -1 ? getNextTitle() : titles[currentTitleIndex];
        let speed = typingSpeed;
        if (isDeleting) {
            speed = typingSpeed / 2;
            currentText = fullTitle.substring(0, currentText.length - 1);
        } else {
            currentText = fullTitle.substring(0, currentText.length + 1);
        }
        subtitleElement.textContent = currentText;
        if (!isDeleting && currentText === fullTitle) {
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentTitleIndex = -1;
            speed = 500;
        }
        setTimeout(typeEffect, speed + (Math.random() * 50));
    }
    typeEffect();
}
```

---

### Section Icons Animation Module (`animations.js`)

**Purpose:**  
Controls one-time animations for section icons as they first appear in the viewport.

**Key Logic:**
- Sets up an Intersection Observer to detect elements with the `.once-animate` class.
- Adds the `animated` class when an element is 20% visible.
- For WebP images within these elements, sets `animation-iteration-count` to 1 after loading.
- Provides a fallback for browsers without Intersection Observer support.

**Code Excerpt:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const animateOnceElements = document.querySelectorAll('.once-animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const webpImage = entry.target.querySelector('img');
                if (webpImage) {
                    webpImage.addEventListener('load', () => {
                        webpImage.style.animationIterationCount = '1';
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    animateOnceElements.forEach(element => observer.observe(element));
    if (!('IntersectionObserver' in window)) {
        animateOnceElements.forEach(element => {
            element.classList.add('animated');
            const webpImage = element.querySelector('img');
            if (webpImage) {
                webpImage.style.animationIterationCount = '1';
            }
        });
    }
});
```

---

### Navigation Module (`navigation.js`)

**Purpose:**  
Manages mobile menu toggling, smooth scrolling between sections, and dynamic highlighting of the active navigation link.

**Key Functions:**
- **initNavigation():**  
  Toggles the mobile menu on hamburger click, closes it when clicking outside, and enables smooth scrolling (adjusted for the fixed navbar).
- **updateActiveNavOnScroll():**  
  Monitors the scroll position to identify the current section and highlights the corresponding nav link.

**Code Excerpt:**
```javascript
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
        updateActiveNavOnScroll();
    });
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}
```

---

### Experience Module (`experience.js`)

**Purpose:**  
Renders an interactive timeline of work experience with expandable details.

**Key Functions:**
- **initExperience():**  
  Checks for a timeline container, loads experience objects, and calls renderExperienceTimeline().
- **renderExperienceTimeline(experiences, container):**  
  Iterates over the experience data and dynamically creates timeline items with alternating alignment.
- **addTimelineInteractivity():**  
  Adds click listeners to toggle the display of additional details (responsibilities, technologies).

**Code Excerpt:**
```javascript
function initExperience() {
    const timelineContainer = document.querySelector('.timeline');
    if (!timelineContainer) return;
    
    const experiences = [
        {
            id: 1,
            title: 'Project Co-Founder & Manager',
            company: 'Huebel Art',
            period: 'February 2022 - Present',
            description: 'Co-founded a pioneering blockchain-based platform creating a comprehensive ecosystem of Web3 solutions and tools.',
            responsibilities: [
                'Managed the design, development, and deployment of decentralized products using Python, JavaScript, and Oracle SQL',
                'Implemented agile methodologies and utilized Git for version control, ensuring high code quality and rapid iterative development',
                'Led end-to-end development of 3+ blockchain applications, resulting in a 20% increase in user engagement',
                'Implemented a localized tracking solution for legacy smart contracts on The Open Network, enhancing system reliability and traceability'
            ],
            technologies: ['Python', 'JavaScript', 'Oracle SQL', 'Blockchain', 'Git', 'Agile']
        },
        // Additional experience objects...
    ];
    
    renderExperienceTimeline(experiences, timelineContainer);
    addTimelineInteractivity();
}

function renderExperienceTimeline(experiences, container) {
    container.innerHTML = '';
    experiences.forEach((exp, index) => {
        const isEven = index % 2 === 0;
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${isEven ? 'left' : 'right'}`;
        timelineItem.setAttribute('data-id', exp.id);
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${exp.period}</div>
                <h3 class="timeline-title">${exp.title}</h3>
                <h4 class="timeline-company">${exp.company}</h4>
                <p class="timeline-description">${exp.description}</p>
                <div class="timeline-details-toggle">
                    <span>Show details</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="timeline-details">
                    <h4>Responsibilities:</h4>
                    <ul>
                        ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                    <div class="timeline-technologies">
                        <h4>Technologies:</h4>
                        <div class="tech-tags">
                            ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(timelineItem);
    });
}

function addTimelineInteractivity() {
    const toggleButtons = document.querySelectorAll('.timeline-details-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const timelineItem = button.closest('.timeline-item');
            const details = timelineItem.querySelector('.timeline-details');
            const icon = button.querySelector('i');
            if (details.style.maxHeight) {
                details.style.maxHeight = null;
                button.querySelector('span').textContent = 'Show details';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                details.style.maxHeight = details.scrollHeight + 'px';
                button.querySelector('span').textContent = 'Hide details';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
}
```

---

### Main Module (`main.js`)

**Purpose:**  
Acts as the central initializer, coordinating the startup sequence, theme switching, error handling, and ensuring smooth page loading.

**Key Functions:**
- **Initialization Sequence:**  
  On `DOMContentLoaded`, sets a loading state, initializes core modules (navigation, animations, theme switching, image error handling), then removes the loading state.
- **Delayed Initialization:**  
  Uses a timeout to initialize heavier sections (experience, projects, skills) after the initial load.
- **initThemeSwitcher():**  
  Reads the user’s theme preference from localStorage and applies the correct theme while preventing rapid toggling.
- **Error Handling & Image Load Fallback:**  
  Wraps module initialization in try-catch blocks and implements a fallback for profile image errors.

**Code Excerpt:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized');
    document.body.classList.add('loading');
    
    try {
        initNavigation();
        initAnimation();
        initThemeSwitcher();
        handleImageLoadErrors();
        initComponents();
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        
        setTimeout(() => {
            try {
                const experienceContainer = document.querySelector('#experience .timeline');
                const projectsContainer = document.querySelector('#projects .projects-grid');
                const skillsContainer = document.querySelector('#skills .skills-container');
                
                initExperience();
                initProjects();
                initSkills();
                initContact();
                
                if (projectsContainer && !projectsContainer.children.length) {
                    initProjects();
                }
                if (skillsContainer && !skillsContainer.children.length) {
                    initSkills();
                }
                
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
            } catch (error) {
                console.error('Error in delayed initialization:', error);
                document.body.classList.remove('loading');
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = `<p>There was an error loading the portfolio content: ${error.message}</p>`;
                document.body.appendChild(errorMessage);
            }
        }, 300);
    } catch (error) {
        console.error("Error initializing portfolio:", error);
        alert("There was an error loading the portfolio. Please check the console for details.");
        document.body.classList.remove('loading');
    }
});

function initThemeSwitcher() {
    const checkbox = document.getElementById('checkbox');
    if (!checkbox) return;
    const body = document.body;
    const prefersDarkMode = localStorage.getItem('theme') !== 'light';
    if (prefersDarkMode) {
        body.classList.remove('light-theme');
        checkbox.checked = false;
    } else {
        body.classList.add('light-theme');
        checkbox.checked = true;
    }
    let isProcessing = false;
    checkbox.addEventListener('change', function() {
        if (isProcessing) return;
        isProcessing = true;
        if (this.checked) {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
        setTimeout(() => { isProcessing = false; }, 300);
    });
}

function handleImageLoadErrors() {
    const profileImg = document.querySelector('.profile-image img');
    if (profileImg) {
        profileImg.onerror = function() {
            console.error('Error loading profile image');
        };
    }
}

function initComponents() {
    if (document.querySelector('.timeline')) {
        try { initExperience(); } catch (error) { console.error('Error initializing experience section:', error); }
    }
    if (document.querySelector('.projects-grid')) {
        try { initProjects(); } catch (error) { console.error('Error initializing projects section:', error); }
    }
    if (document.querySelector('.skills-container')) {
        try { initSkills(); } catch (error) { console.error('Error initializing skills section:', error); }
    }
    if (document.querySelector('.contact')) {
        try { initContact(); } catch (error) { console.error('Error initializing contact section:', error); }
    }
    handleImageLoadErrors();
}
```

---

## Conclusion & Final Notes

This guide walks through every part of my portfolio website – from responsive design and theme switching to custom animations and interactive features. Each module is self-contained yet integrates seamlessly to deliver a clean, efficient, and engaging web experience. Use this guide as a reference for extending or modifying the codebase.

*Happy coding!*
