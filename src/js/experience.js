/**
 * Experience module
 * Handles the interactive timeline display of work experience
 */

function initExperience() {
    // Get the timeline container
    const timelineContainer = document.querySelector('.timeline');
    
    if (!timelineContainer) return;
    
    // Experience data based on Raman's resume
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
        {
            id: 2,
            title: 'Online Business & Web Development',
            company: 'Self-employed',
            period: 'July 2023 - January 2024',
            description: 'Self-employed web developer focusing on creating optimized web layouts and interactive user interfaces.',
            responsibilities: [
                'Optimized website layouts and navigation structures using HTML, CSS, and JavaScript',
                'Leveraged modern front-end frameworks to develop responsive and dynamic user interfaces',
                'Developed responsive web interfaces and executed SEO & SEM campaigns that boosted organic traffic by 40%',
                'Increased revenue by 25% within 6 months through collaboration with content creators'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'SEO/SEM']
        },
        {
            id: 3,
            title: 'Sales Representative',
            company: 'Smart Solutions Supply',
            period: 'August 2019 - March 2021',
            description: 'Developed sales & marketing strategies that enhanced customer engagement at Whitchurch-Stouffville location.',
            responsibilities: [
                'Leveraged social media platforms to coordinate operations and gather client feedback',
                'Interacted regularly with clients to assess service quality and identify opportunities for product enhancements',
                'Developed and implemented sales strategies that improved customer satisfaction',
                'Maintained detailed records of customer interactions and sales performance'
            ],
            technologies: ['Sales Strategies', 'Social Media Marketing', 'Customer Relations', 'Market Analysis']
        }
    ];
    
    // Render the timeline
    renderExperienceTimeline(experiences, timelineContainer);
    
    // Add click handlers for the timeline items
    addTimelineInteractivity();
}

/**
 * Renders the timeline with provided experience data
 * @param {Array} experiences - Array of experience objects
 * @param {HTMLElement} container - The container element
 */
function renderExperienceTimeline(experiences, container) {
    // Clear the container first
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

/**
 * Adds interactivity to the timeline items
 */
function addTimelineInteractivity() {
    // Get all timeline toggle buttons
    const toggleButtons = document.querySelectorAll('.timeline-details-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const timelineItem = button.closest('.timeline-item');
            const details = timelineItem.querySelector('.timeline-details');
            const icon = button.querySelector('i');
            
            // Toggle visibility
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