# Portfolio Website - Technical Documentation

## Overview
This repository contains my personal portfolio website built from scratch with vanilla JavaScript, HTML5, and CSS3. No frameworks were used - everything is custom coded to showcase my true programming abilities and attention to detail.

## Technical Stack & Implementation

### Core Technologies
- **HTML5**: Semantic markup structure
- **CSS3**: Custom properties, flexbox, grid, animations
- **Vanilla JavaScript**: DOM manipulation, async functionality, intersection observers

### Key Features & Implementation Details

#### Responsive Design Architecture
- Built with a device-agnostic approach using CSS Grid and Flexbox.
- The site maintains pixel-perfect layouts across all breakpoints (mobile, tablet, desktop) through a carefully designed responsive system that adapts content containers rather than relying on fixed media queries.

#### Theme System
- Implemented a custom dark/light theme system using CSS variables and DOM manipulation:
  - CSS variables store theme colors for instant application.
  - Theme preference persists using localStorage.
  - Hardware-acceleration enabled transitions prevent layout shifts.
  - System preference detection via `prefers-color-scheme`.

#### WebP Animation Integration
- Custom WebP animations added for each section (Card Index, Pencil, Briefcase, Graduation Cap).
- Intersection Observer API controls animation playback to ensure animations trigger once.
- Animation timing optimized to prevent performance impacts.
- Implemented programmatic animation control with `animation-iteration-count`:

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

#### Interactive Contact System
- Custom-built popup system for contact information.
- Implements the Clipboard API for seamless contact info copying.
- Modal system built from scratch with proper focus management.
- Handler pattern for various contact types (email, phone, links).

#### Terminal-Inspired UI Elements
- Custom typing animation with variable speed and cursor effects.
- Terminal-inspired text styling with monospace fonts.
- Glitch effects for visual engagement using CSS pseudo-elements.

#### Code Organization
- Modular JavaScript with separate files for distinct functionality.
- Event delegation pattern for optimal performance.
- CSS structured with logical component grouping.
- Lazy-loading implementation for image assets.

#### Performance Optimizations
- Deferred JavaScript loading with async pattern.
- Critical CSS inlined for immediate rendering.
- WebP image format with lazy loading.
- Custom font loading strategy with fallbacks.
- Animation throttling for performance.

#### Browser Compatibility
Tested and optimized for:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge (Chromium-based)
- Mobile Safari and Chrome for Android

#### Future Development Roadmap
- Server-side rendering option for improved first load.
- Progressive Web App capabilities.
- Automated build process with asset optimization.

---

This project serves as a demonstration of my ability to build clean, efficient, accessible, and performant web applications without relying on UI frameworks. Every animation, interaction, and visual element is custom-coded to demonstrate my core frontend development skills.

# Developer Guide for Portfolio Website

This guide provides a comprehensive overview of the portfolio website's codebase. It explains the logic and methods used across the various modules, complete with code excerpts and detailed commentary. The website is built from scratch using vanilla JavaScript, HTML5, and CSS3—with no external frameworks—to demonstrate advanced frontend techniques in responsive design, custom animations, interactive components, and robust error handling.

---

## Table of Contents
1. [Introduction & Overview](#introduction--overview)
2. [File Structure & Modules](#file-structure--modules)
3. [Module Guides](#module-guides)
   - [Contact Module (`contact.js`)](#contact-module-contactjs)
   - [Animation Module (`animation.js`)](#animation-module-animationjs)
   - [Section Icons Animation Module (`animations.js`)](#section-icons-animation-module-animationsjs)
   - [Navigation Module (`navigation.js`)](#navigation-module-navigationjs)
   - [Experience Module (`experience.js`)](#experience-module-experiencejs)
   - [Main Module (`main.js`)](#main-module-mainjs)
4. [Conclusion & Final Notes](#conclusion--final-notes)

---

## Introduction & Overview

This portfolio website is crafted entirely with **HTML5**, **CSS3**, and **Vanilla JavaScript**. Every element—from animations to theme switching—is custom-built to ensure maximum performance, accessibility, and a pixel-perfect design across all devices. The project is split into distinct modules, each responsible for a set of functionalities, allowing for clear organization and maintainability.

---

## File Structure & Modules

- **contact.js:** Manages the contact form, input validation, form submission, and interactive popups including clipboard operations.
- **animation.js:** Handles scroll-triggered animations and an advanced typing effect for the hero subtitle.
- **animations.js:** Deals with one-time animations for section icons using the Intersection Observer API.
- **navigation.js:** Implements mobile navigation, smooth scrolling, and active link highlighting.
- **experience.js:** Renders an interactive timeline of work experiences with expandable details.
- **main.js:** Acts as the central initializer, orchestrating the startup sequence, theme switching, and error handling.

---

## Module Guides

### Contact Module (`contact.js`)

**Purpose:**  
Handles contact form validation and submission. Also manages interactive contact popups and clipboard copying for contact details.

**Key Functions & Logic:**

- **`initContact()`**
  - Selects the contact form by its ID.
  - Attaches event listeners for form submission and input events (blur and input) to validate fields and clear errors.
  
- **`handleFormSubmit(e)`**
  - Prevents the default form submission.
  - Retrieves form input elements (name, email, subject, message).
  - Validates each field using the `validateInput()` function.
  - If all fields are valid, simulates a form submission (logs data and shows a success message) and resets the form.
  
- **`validateInput(e)`**
  - Checks the input based on its type (e.g., ensuring the name is at least 2 characters, a valid email format, etc.).
  - Adds an error class and creates an error message element if validation fails.
  
- **`showFormMessage(type, message)`**
  - Dynamically creates a message element with an icon (success or error) and displays it above the form.
  - Automatically removes success messages after 5 seconds.

- **Popup & Clipboard Functionality:**
  - Listens for clicks on elements with the `.contact-item` class.
  - Displays a popup with the corresponding contact information.
  - Provides buttons to either copy the contact info (using the Clipboard API) or open the corresponding app (email, phone, maps).

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
Manages animations that trigger when elements scroll into view and implements an advanced typing effect for dynamic text in the hero section.

**Key Functions & Logic:**

- **`initAnimation()`**
  - Selects elements with the `.animate-on-scroll` class and triggers their animations via `observeElements()`.
  - Forces animations on specific elements (like project cards) after a short delay.
  - Initiates the typing animation for the hero subtitle.
  
- **`initTypingAnimation()`**
  - Cycles through an array of professional titles using a natural typing effect.
  - Alternates between typing and deleting characters, using dynamic timing to simulate realistic typing.

- **`observeElements(elements)`**
  - Uses the Intersection Observer API to monitor when elements come into the viewport.
  - Once an element is visible, the function adds an `animated` class to trigger CSS animations and then stops observing the element.

- **`addAnimationClasses()`**
  - Automatically assigns specific animation classes (like fade-in effects) to various page sections upon DOM content load.

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
Controls animations for section icons that should play only once when they first appear in the viewport.

**Key Logic:**

- Sets up an Intersection Observer to detect elements with the `.once-animate` class.
- Once an element is 20% visible and not yet animated, it adds the `animated` class.
- For any contained WebP images, it sets `animation-iteration-count` to 1 upon image load.
- Provides a fallback for browsers that do not support Intersection Observer.

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
Manages the website's navigation by handling mobile menu toggling, smooth scrolling between sections, and dynamically highlighting the active navigation link.

**Key Functions & Logic:**

- **`initNavigation()`**
  - Toggles the mobile menu when the hamburger button is clicked.
  - Adds a global click listener to close the menu when clicking outside.
  - Handles smooth scrolling when a navigation link is clicked and adjusts for the fixed navbar height.
  
- **`updateActiveNavOnScroll()`**
  - Monitors the scroll position to determine which section is in view.
  - Highlights the corresponding navigation link accordingly.

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
        const sectionHeight = section.clientHeight;
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
Renders an interactive timeline for work experience and adds interactivity for expanding or collapsing detailed information.

**Key Functions & Logic:**

- **`initExperience()`**
  - Checks if a timeline container exists.
  - Loads an array of experience objects (each with title, company, period, description, responsibilities, and technologies).
  - Calls `renderExperienceTimeline()` to build the timeline in the DOM.
  
- **`renderExperienceTimeline(experiences, container)`**
  - Iterates over the experience data.
  - Dynamically creates timeline items with alternating alignment (left/right) and embeds details.
  
- **`addTimelineInteractivity()`**
  - Adds click event listeners to toggle the display of additional details (responsibilities, technologies) within each timeline item.

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
Acts as the central orchestrator for the website. It initializes all modules, manages theme switching, handles error detection, and ensures smooth loading and user feedback.

**Key Functions & Logic:**

- **Initialization Sequence:**
  - Listens for the `DOMContentLoaded` event to begin initialization.
  - Applies a loading state to the page until essential components are ready.
  - Initializes core modules: navigation, animations, theme switching, and image error handling.
  
- **Delayed Initialization:**
  - Uses a short timeout to initialize heavier sections (experience, projects, skills) after the initial load to avoid layout shifts.
  
- **Theme Switching (`initThemeSwitcher()`):**
  - Reads the user's theme preference from `localStorage` and applies the appropriate theme.
  - Uses a processing lock to prevent rapid toggling errors.
  
- **Error Handling:**
  - Wraps module initialization in try-catch blocks to capture and log errors.
  - Displays a user-friendly error message if a module fails to initialize.
  
- **Image Load Error Handling:**
  - Implements a simple fallback to catch and log errors when a profile image fails to load.

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

This comprehensive guide has walked you through the architecture and logic of the portfolio website. Each module is designed to be self-contained yet works together seamlessly to provide a smooth, responsive, and engaging user experience. Key takeaways include:

- **Modular Architecture:** Each JavaScript file handles specific features, making the code maintainable and scalable.
- **Responsive & Adaptive Design:** Advanced CSS techniques and JavaScript event handling ensure the site looks great on all devices.
- **Dynamic Interactions:** From smooth scrolling navigation to one-time animations and an advanced typing effect, the site leverages modern web APIs for a dynamic user interface.
- **Robust Error Handling:** Multiple layers of error checking and fallback mechanisms ensure a resilient application.

Developers can use this guide as a reference for extending or modifying the codebase. Every module is fully commented within the source files to aid understanding and further customization.

*Happy coding!*

