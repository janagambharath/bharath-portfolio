document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Mobile menu functionality
    initMobileMenu();
    
    // Smooth animations
    initAnimations();
    
    // Header scroll effect
    initHeaderScrollEffect();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('[data-section]');
    const sections = document.querySelectorAll('.section, .hero-section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            updateActiveNav(this);
        });
    });
    
    // Show specific section
    function showSection(sectionId) {
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
        }
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Update active navigation link
    function updateActiveNav(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
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
    
    if (mobileToggle && navLinks) {
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
    }
}

function initAnimations() {
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
        observer.observe(el);
    });
    
    // Typing animation for hero subtitle
    initTypingAnimation();
}

function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
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
    }
}

function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
        }
    });
}

// API interaction functions (for future enhancement)
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        // Handle project data
        console.log('Projects:', projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

async function loadSkills() {
    try {
        const response = await fetch('/api/skills');
        const skills = await response.json();
        // Handle skills data
        console.log('Skills:', skills);
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

// Project detail modal (for future enhancement)
function showProjectDetails(projectId) {
    // Implementation for showing detailed project information
    console.log('Showing details for project:', projectId);
    
    // Create modal or expand card with more details
    // This could include:
    // - Detailed description
    // - Screenshots
    // - Live demo links
    // - Source code links
    // - Technologies used in detail
}

// Contact form handling (for future enhancement)
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const contactData = Object.fromEntries(formData);
            
            // Send contact data to backend
            submitContactForm(contactData);
        });
    }
}

async function submitContactForm(data) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
        } else {
            showNotification('Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error submitting contact form:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
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
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add slide animations for notifications
const style = document.createElement('style');
style.textContent = `
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
