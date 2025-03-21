/**
 * Section Icons Animation
 * Handles animations that play only once when section becomes visible
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get all elements that should animate once
    const animateOnceElements = document.querySelectorAll('.once-animate');
    
    // Set up IntersectionObserver to detect when elements are in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in viewport and hasn't been animated yet
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                // Add the animated class to trigger the animation
                entry.target.classList.add('animated');
                
                // Find any WebP images within this element
                const webpImage = entry.target.querySelector('img');
                if (webpImage) {
                    // Force the animation to play only once
                    webpImage.addEventListener('load', () => {
                        // Set animation-iteration-count to 1 directly on the element
                        webpImage.style.animationIterationCount = '1';
                    });
                }
                
                // Optional: Stop observing this element after it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Element is considered visible when it's 20% in the viewport
        threshold: 0.2,
        // Start observation when element is 100px away from viewport
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Start observing each element
    animateOnceElements.forEach(element => {
        observer.observe(element);
    });
    
    // For browsers that don't support IntersectionObserver
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