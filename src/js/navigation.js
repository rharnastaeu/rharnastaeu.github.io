/**
 * Navigation module
 * Handles mobile menu toggle and smooth scrolling
 */

// Navigation handler - manages mobile menu, smooth scrolling, and highlights active sections

function initNavigation() {
    // Grab all the navigation elements we'll need
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu open/closed when hamburger is clicked
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside of it (better UX)
    document.addEventListener('click', (e) => {
        if (
            navMenu && 
            navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)
        ) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Handle clicks on nav links - smooth scroll + highlight active link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close the mobile menu if it's open
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Find the section this link points to
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to the section, accounting for fixed navbar height
                window.scrollTo({
                    top: targetSection.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
                
                // Update which link is highlighted
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Add shadow to navbar when scrolling down (subtle depth effect)
    // Note: Only change shadow, not background color (to preserve theme)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Only adjust the box shadow, not the background color
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
        
        // Highlight the nav link for section currently in viewport
        updateActiveNavOnScroll();
    });
}

// Detects which section is currently visible and highlights the matching nav link
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        // Check if we've scrolled to this section (with some buffer space)
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Highlight the link that matches the current section
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
} 