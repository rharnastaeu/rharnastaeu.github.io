/**
 * Projects module
 * Handles projects display, filtering, and interactions
 */

function initProjects() {
    // Get the projects container
    const projectsContainer = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }
    
    console.log('Initializing projects module');
    
    // Base64 encoded placeholder image (blue gradient square)
    const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAwFBMVEUAAABKh8FGgsJKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8FKh8F5rwCEAAAAP3RSTlMAAQMFBgcICgwOEBETFRcaHB4gIiQoMDI0Njg6PD5AQkRITlBSVFpcXmJmcHJ0d3p8f4KIjpSaoqqwvMTM2OTgjoBNAAAEFUlEQVR42uzXQWrCQBjG8W9COk1a2sVsCiIuuuqmq4qubL3/qcqQTQsiFMxMmIH3/xtIePhgHiYCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICJWVp6sWBq7pdqdW9QT7dXqssbs5p5plY5aNSdg9rmaMas5qVanTOoH6pLZVZzV6lVPdS62bwys1lYdFq1fnx59R6ddvfGzOZWYVjjW1iGZnbbKn0YR/+XiKrVvKrTD4WY+kq9zE3Hrw/jyV/3VPOmu0QitTvrblV3Qy1lt8+6ezaLOpz0d6tJoEiUaX79G6ljqmdXC72anJFaJnpWZaRW8/+5Xf8geha1P99/JHpqD8OPf/31ZNKz+bD/iOh5oGdET+Njt/9I9PTUFwzreJf/Rj2n9XXA1S6rnrOCfttF9JyqQP+LiJ5nPdOIni966kT0vOuZlfXUZzXbi+ipLurZWdFNLaJnzNcw5Gu4vqr51FuhZ9TTczqRnopHz46enkdPT8+jp+fR0/PoCcCg02q2SktpUG0qnkfv2zNe70j/5XT4u56tXY+ed0XPl6X/t+eZnglLacdTpN12PD2vGz20HU+RH5i246mmPbc9V9ZT2/P07LXtebqMoO15imzA2/HU8bXteXoO2vF0vZTanqfnsW3P0/UZats7yTOdK+vpefS8K3rGtUmfnNKTpkee9/3oPfqmMT2dflNKg55uny6lKT2bHnN6Mt95Ok9S+dLzXHp6Hj09j56eR0/Po+c5PY+ez+n5nJ5nFPSM6Rnpuarn+UDPBz3P6HlGz+f0fE7PM3o+p+dzes7pOafnczqaTE/PuDyfJ6vdcpee1iOi5zd6fqPnYsz3cDFu6bkY0xOAUau+qlttbhtvVnclUFqu7+qW20bdltvcIlCaFe0tN23VrV0kJQUK1Wrz8nG9TZt1lbRMoFxu9frSaWt8UMppkoDQMi0+OvXjZp0WaVo3TaA8mc2TenOXxI+70zpdxcvVLF7Mk3SWJxAoLmdpnqf1y/Jj+zGqj+Wo3tyvdm+SawAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAaXkDlCoqJ8x0pAMAAAAASUVORK5CYII=';
    
    // Projects data based on Raman's portfolio
    const projects = [
        {
            id: 1,
            title: 'BOLT Foundation',
            description: 'Decentralized community of web3 enthusiasts, builders, projects, and holders with its own token and utilities.',
            image: 'src/assets/images/huebelbanner.png',
            category: 'blockchain',
            technologies: ['Blockchain', 'Python', 'JavaScript', 'Oracle SQL', 'TON api', 'CMC/Coingeko api'],
            liveLink: 'https://huebel.art/',
            sourceLink: 'https://github.com/boltoshi-labs/huebel.art'
        },
        {
            id: 2,
            title: 'WordPress Website Development',
            description: 'Comprehensive management of WordPress websites including design, technical implementation, and back-end development for various clients.',
            image: 'src/assets/images/pexels-luis-gomes-166706-546819.jpg',
            category: 'web',
            technologies: ['WordPress', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'Shopify', 'eCommerce'],
            liveLink: '',
            sourceLink: ''
        },
        {
            id: 3,
            title: 'CleanFormula Mobile App',
            description: 'Co-founded and developed an on-demand service mobile application similar to Uber but specialized for cleaning and dry cleaning services. Managed both business operations and technical development.',
            image: 'src/assets/images/V1.png',
            category: 'web',
            technologies: ['Mobile App Development', 'UI/UX Design', 'Startup Management', 'Service Platform', 'Business Development'],
            liveLink: '',
            sourceLink: ''
        },
        {
            id: 4,
            title: 'SEO & Digital Marketing',
            description: 'Implemented search engine optimization strategies that significantly increased client sales. Provided complete Google optimization setup and managed advertising campaigns.',
            image: 'src/assets/images/pexels-marketingtuig-185576.jpg',
            category: 'web',
            technologies: ['SEO', 'Google Ads', 'Facebook Ads', 'Instagram Ads', 'Analytics', 'Digital Marketing'],
            liveLink: '',
            sourceLink: ''
        },
        {
            id: 5,
            title: 'Blockchain Telegram Bot',
            description: 'Developed an advanced Telegram bot with on-chain integration using TON API and other SDKs. Features include address validation, balance tracking, notifications, and custom analytics for top holders.',
            image: 'src/assets/images/pexels-rakicevic-nenad-233369-1262304.jpg',
            category: 'blockchain',
            technologies: ['Python', 'Telegram API', 'TON API', 'CoinGecko API', 'CMC API', 'Blockchain'],
            liveLink: '',
            sourceLink: ''
        },
        {
            id: 6,
            title: 'TON Ecosystem Wiki',
            description: 'Created a comprehensive wiki-like platform dedicated to BOLT Foundation and The Open Network ecosystem. Includes interactive features and mini-games like BoltClicker, Flappy Bolt, and Find Bolt.',
            image: 'src/assets/images/screenBoltoPed.jpg',
            category: 'blockchain',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Wiki Development', 'Game Development'],
            liveLink: '',
            sourceLink: ''
        },
        {
            id: 7,
            title: 'Blockchain Mini App (React)',
            description: 'Redesigned and rebuilt the Telegram bot as a scalable React mini-app with improved UI/UX. Enhanced stability while maintaining all tracking features from the original bot.',
            image: 'src/assets/images/reactminiApp.png',
            category: 'blockchain',
            technologies: ['React', 'JavaScript', 'TON API', 'Blockchain', 'UI/UX Design'],
            liveLink: 'https://my-telegram-miniapp-alpha.vercel.app/',
            sourceLink: ''
        },
        {
            id: 8,
            title: 'SmartSign NFT Project',
            description: 'Co-founded a decentralized solution for NFT signatures implemented as smart contracts. The project served as a handshake between token owners and signatories, receiving a grant from TON Foundation.',
            image: 'src/assets/images/sstest.jpg',
            category: 'blockchain',
            technologies: ['Smart Contracts', 'NFT', 'Blockchain', 'TON', 'Digital Signatures'],
            liveLink: '',
            sourceLink: ''
        }
    ];
    
    // Log filter buttons
    filterButtons.forEach(btn => {
        console.log('Filter button:', btn.textContent.trim(), 'with data-filter =', btn.getAttribute('data-filter'));
    });
    
    // Log projects
    console.log('Total projects:', projects.length);
    projects.forEach(project => {
        console.log('Project:', project.title, 'Category:', project.category);
    });
    
    // Render all projects initially
    renderProjects(projects, projectsContainer);
    
    // Add filter functionality
    if (filterButtons.length > 0) {
        addFilterFunctionality(filterButtons, projects, projectsContainer);
    }
    
    // Add project click handlers for modal/details view
    addProjectInteractions();
}

/**
 * Renders projects to the specified container
 * @param {Array} projects - Array of project objects
 * @param {HTMLElement} container - The container element
 */
function renderProjects(projects, container) {
    // Clear the container
    container.innerHTML = '';
    
    console.log('Rendering', projects.length, 'projects');
    
    // Check if there are projects to display
    if (projects.length === 0) {
        container.innerHTML = '<p class="no-projects">No projects found matching the selected category.</p>';
        return;
    }
    
    // Render each project
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        projectCard.style.opacity = 1; // Force visibility
        
        // Remove hover darkening effect for SmartSign project (ID 8)
        if (project.id === 8) {
            projectCard.classList.add('no-hover-effect');
        }
        
        // Create links section only if links are available
        const linksHTML = (project.liveLink || project.sourceLink) ? `
            <div class="project-overlay">
                <div class="project-links">
                    ${project.liveLink ? `<a href="${project.liveLink}" class="project-link" target="_blank" title="View Live">
                        <i class="fas fa-external-link-alt"></i>
                    </a>` : ''}
                    ${project.sourceLink ? `<a href="${project.sourceLink}" class="project-link" target="_blank" title="View Source">
                        <i class="fab fa-github"></i>
                    </a>` : ''}
                </div>
            </div>
        ` : '';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                ${linksHTML}
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        container.appendChild(projectCard);
    });
    
    console.log('Project cards rendered:', container.children.length);
}

/**
 * Adds filtering functionality to category buttons
 * @param {NodeList} buttons - Filter buttons
 * @param {Array} projects - Array of project objects
 * @param {HTMLElement} container - Projects container
 */
function addFilterFunctionality(buttons, projects, container) {
    // Set the "All" button as active by default
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active class
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get the filter category
            const filter = button.getAttribute('data-filter');
            console.log('Filter clicked:', filter);
            
            // Filter projects
            const filteredProjects = filter === 'all'
                ? projects
                : projects.filter(project => project.category === filter);
            
            console.log('Filtered projects:', filteredProjects.length);
            
            // Render filtered projects
            renderProjects(filteredProjects, container);
            
            // Reinitialize project interactions
            addProjectInteractions();
        });
    });
}

/**
 * Adds interactive behaviors to project cards
 */
function addProjectInteractions() {
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    console.log('Adding interactions to', projectCards.length, 'project cards');
    
    projectCards.forEach(card => {
        // Add hover effects or click handlers as needed
        // This can be expanded to add modals, details pages, etc.
        
        // Example: Add animation classes when projects come into view
        card.classList.add('animate-on-scroll', 'fade-in-up');
    });
}

// Force re-render projects when page is fully loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        const projectsContainer = document.querySelector('.projects-grid');
        if (projectsContainer && projectsContainer.children.length === 0) {
            console.log('Force re-rendering projects after page load');
            initProjects();
        }
    }, 1500);
}); 