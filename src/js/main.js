/**
 * Main JavaScript file for portfolio website
 * Handles initialization of all components
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized');
    
    // Add loading state to the body
    document.body.classList.add('loading');
    
    try {
        console.log('Starting navigation initialization');
        // Initialize all components
        initNavigation();
        console.log('Navigation initialized');
        
        initAnimation();
        console.log('Animation initialized');
        
        // Initialize theme switching - using the consolidated function
        initThemeSwitcher();
        console.log('Theme switching initialized');
        
        // Initialize image error handling
        handleImageLoadErrors();
        console.log('Image error handling initialized');
        
        // Initialize components
        initComponents();
        console.log('Components initialized');
        
        // Remove loading state
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        
        // Initialize content sections with a slight delay to ensure DOM is ready
        setTimeout(() => {
            console.log('Starting content initialization after delay');
            
            try {
                // Find all section containers to ensure they exist
                const experienceContainer = document.querySelector('#experience .timeline');
                const projectsContainer = document.querySelector('#projects .projects-grid');
                const skillsContainer = document.querySelector('#skills .skills-container');
                
                console.log('Container check:', 
                    'Experience:', experienceContainer ? 'Found' : 'Missing',
                    'Projects:', projectsContainer ? 'Found' : 'Missing',
                    'Skills:', skillsContainer ? 'Found' : 'Missing'
                );
                
                console.log('Initializing experience section');
                initExperience();
                console.log('Experience section initialized');
                
                console.log('Initializing projects section');
                initProjects();
                console.log('Projects section initialized');
                
                console.log('Initializing skills section');
                initSkills();
                console.log('Skills section initialized');
                
                console.log('Initializing contact section');
                initContact();
                console.log('Contact section initialized');
                
                // Double check containers after initialization
                console.log('Post-init container check:', 
                    'Projects grid has', document.querySelectorAll('.projects-grid .project-card').length, 'project cards',
                    'Skills container has', document.querySelectorAll('.skills-container .skill-category').length, 'skill categories'
                );
                
                // Force reflow of containers to ensure visibility
                if (projectsContainer && !projectsContainer.children.length) {
                    console.log('Force reinitializing projects');
                    initProjects();
                }
                
                if (skillsContainer && !skillsContainer.children.length) {
                    console.log('Force reinitializing skills');
                    initSkills();
                }
                
                // Remove loading state
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                
                console.log('All modules initialized successfully');
            } catch (error) {
                console.error('Error in delayed initialization:', error);
                document.body.classList.remove('loading');
                // Add error message to page
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

/**
 * Initializes theme switching functionality - consolidated from both implementations
 */
function initThemeSwitcher() {
    const checkbox = document.getElementById('checkbox');
    if (!checkbox) {
        console.error('Theme toggle checkbox not found');
        return;
    }
    
    const body = document.body;
    
    // Use a single consistent localStorage key
    const prefersDarkMode = localStorage.getItem('theme') !== 'light';
    
    // Set initial state
    if (prefersDarkMode) {
        // Dark mode (default)
        body.classList.remove('light-theme');
        checkbox.checked = false;
    } else {
        // Light mode
        body.classList.add('light-theme');
        checkbox.checked = true;
    }
    
    // Add event listener for theme toggle with debounce to prevent double-triggering
    let isProcessing = false;
    
    checkbox.addEventListener('change', function() {
        if (isProcessing) return;
        isProcessing = true;
        
        console.log('Theme toggle clicked. New checked state:', this.checked);
        
        if (this.checked) {
            // Switch to light theme
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            console.log('Theme switched to light');
        } else {
            // Switch to dark theme
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            console.log('Theme switched to dark');
        }
        
        // Reset processing flag after a short delay
        setTimeout(() => {
            isProcessing = false;
        }, 300);
    });
}

/**
 * Simplified animation effect for theme changes - removed entirely
 * Let CSS transitions handle the color changes naturally
 */
// function animateThemeChange() {
//     // Animation removed as requested by user
// }

// Handle page loading
window.addEventListener('load', () => {
    console.log('Window fully loaded with all resources');
    // Make sure sections are properly refreshed after all resources are loaded
    const sections = ['experience', 'projects', 'skills'];
    sections.forEach(section => {
        const container = document.querySelector(`#${section} .container`);
        if (container) {
            console.log(`Refreshing ${section} section`);
            // Force a reflow/repaint
            container.style.opacity = 0.99;
            setTimeout(() => {
                container.style.opacity = 1;
            }, 10);
        } else {
            console.warn(`Container for ${section} section not found`);
        }
    });
    
    console.log('All resources loaded');
});

/**
 * Image loading error handler - simplified version
 */
function handleImageLoadErrors() {
    // Add loading error handler to profile image
    const profileImg = document.querySelector('.profile-image img');
    if (profileImg) {
        profileImg.onerror = function() {
            console.error('Error loading profile image');
            // Could set a default fallback image here if needed
        };
    }
}

/**
 * Initialize all components
 */
function initComponents() {
    // Check if sections exist to prevent errors
    if (document.querySelector('.timeline')) {
        try {
            initExperience();
        } catch (error) {
            console.error('Error initializing experience section:', error);
        }
    }
    
    if (document.querySelector('.projects-grid')) {
        try {
            initProjects();
        } catch (error) {
            console.error('Error initializing projects section:', error);
        }
    }
    
    if (document.querySelector('.skills-container')) {
        try {
            initSkills();
        } catch (error) {
            console.error('Error initializing skills section:', error);
        }
    }
    
    if (document.querySelector('.contact')) {
        try {
            initContact();
        } catch (error) {
            console.error('Error initializing contact section:', error);
        }
    }
    
    // Handle profile image optimization
    handleImageLoadErrors();
} 