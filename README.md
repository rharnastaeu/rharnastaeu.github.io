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
