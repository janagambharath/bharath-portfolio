document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Mobile menu functionality
    initMobileMenu();
    
    // Smooth animations
    initAnimations();
    
    // Header scroll effect
    initHeaderScrollEffect();
    
    // Initialize typing animation
    initTypingAnimation();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('[data-section]');
    const sections = document.querySelectorAll('.section, .hero-section');
    
    if (!navLinks.length || !sections.length) {
        console.log('Navigation elements not found');
        return;
    }
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                showSection(targetSection);
                updateActiveNav(this);
            }
        });
    });
    
    // Show specific section
    function showSection(sectionId) {
        try {
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show target section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active-section');
                // Add fade in animation
                targetSection.style.animation = 'fadeInUp 0.8s ease-out';
                
                // Scroll to top smoothly
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Section with id "${sectionId}" not found`);
            }
        } catch (error) {
            console.error('Error showing section:', error);
        }
    }
    
    // Update active navigation link
    function updateActiveNav(activeLink) {
        try {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } catch (error) {
            console.error('Error updating navigation:', error);
        }
    }
    
    // Initialize with home section active
    const homeLink = document.querySelector('[data-section="home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
}

function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileToggle || !navLinks) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    try {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinkElements = document.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
            }
        });
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
}

function initAnimations() {
    try {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observe cards and elements
        const animateElements = document.querySelectorAll(
            '.skill-card, .project-card, .about-card, .contact-card'
        );
        
        animateElements.forEach(el => {
            if (el) {
                observer.observe(el);
            }
        });
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}

function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) {
        console.log('Hero subtitle not found for typing animation');
        return;
    }
    
    try {
        const originalText = subtitle.textContent.trim();
        if (!originalText) return;
        
        subtitle.textContent = '';
        
        let i = 0;
        const typingSpeed = 50;
        
        function typeWriter() {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    } catch (error) {
        console.error('Error in typing animation:', error);
        // Fallback: just show the text
        if (subtitle) {
            subtitle.textContent = subtitle.textContent || 'Aspiring Software Developer';
        }
    }
}

function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) {
        console.log('Header not found for scroll effect');
        return;
    }
    
    try {
        let ticking = false;
        
        function updateHeader() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
                header.style.backdropFilter = 'blur(20px)';
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    } catch (error) {
        console.error('Error initializing header scroll effect:', error);
    }
}

// API interaction functions
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        console.log('Projects loaded:', projects);
        return projects;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}

async function loadSkills() {
    try {
        const response = await fetch('/api/skills');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const skills = await response.json();
        console.log('Skills loaded:', skills);
        return skills;
    } catch (error) {
        console.error('Error loading skills:', error);
        return {};
    }
}

// Project detail modal functionality
function showProjectDetails(projectName) {
    try {
        console.log('Showing details for project:', projectName);
        
        // Create modal backdrop
        const modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'modal-backdrop';
        modalBackdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideInUp 0.3s ease-out;
        `;
        
        modalContent.innerHTML = `
            <button class="modal-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            ">&times;</button>
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">${projectName}</h3>
            <p style="color: var(--text-light); margin-bottom: 1rem;">
                This is a detailed view of the ${projectName} project. 
                More information and features will be added here.
            </p>
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-primary" onclick="window.open('#', '_blank')">View Code</button>
                <button class="btn btn-secondary" onclick="window.open('#', '_blank')">Live Demo</button>
            </div>
        `;
        
        modalBackdrop.appendChild(modalContent);
        document.body.appendChild(modalBackdrop);
        
        // Close modal functionality
        function closeModal() {
            modalBackdrop.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(modalBackdrop)) {
                    document.body.removeChild(modalBackdrop);
                }
            }, 300);
        }
        
        // Close on backdrop click
        modalBackdrop.addEventListener('click', function(e) {
            if (e.target === modalBackdrop) {
                closeModal();
            }
        });
        
        // Close on close button click
        const closeButton = modalContent.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        
        // Close on escape key
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKeyDown);
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        
    } catch (error) {
        console.error('Error showing project details:', error);
    }
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 3000) {
    try {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            word-wrap: break-word;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            info: '#2196f3',
            warning: '#ff9800'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Remove notification after duration
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, duration);
        
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

// Add event listeners for project detail buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to project detail buttons
    setTimeout(() => {
        const projectButtons = document.querySelectorAll('.project-card .btn-small');
        projectButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                const projectCard = this.closest('.project-card');
                const projectTitle = projectCard.querySelector('.project-title');
                const projectName = projectTitle ? projectTitle.textContent : `Project ${index + 1}`;
                showProjectDetails(projectName);
            });
        });
    }, 1000);
});

// Add CSS animations for modals and notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .nav-links.mobile-active {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            border-top: 1px solid var(--glass-border);
            animation: slideDown 0.3s ease-out;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);
