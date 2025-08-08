// Modern Portfolio JavaScript
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for animations
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });

        // Animate cards
        const cards = document.querySelectorAll('.project-card, .service-card, .stat-card, .skill-item, .timeline-content');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        const messageTextarea = document.getElementById('message');
        
        if (messageTextarea) {
            const counter = document.querySelector('.form-counter');
            
            messageTextarea.addEventListener('input', () => {
                const length = messageTextarea.value.length;
                if (counter) {
                    counter.textContent = `${length}/500`;
                    
                    if (length > 500) {
                        counter.style.color = '#ef4444';
                    } else {
                        counter.style.color = '#6b7280';
                    }
                }
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');

                // Basic validation
                if (!name || !email || !subject || !message) {
                    this.showNotification('Please fill in all fields', 'error');
                    return;
                }

                if (!this.isValidEmail(email)) {
                    this.showNotification('Please enter a valid email address', 'error');
                    return;
                }

                if (message.length > 500) {
                    this.showNotification('Message is too long (max 500 characters)', 'error');
                    return;
                }

                // Simulate form submission
                this.showNotification('Message sent successfully!', 'success');
                form.reset();
                
                if (document.querySelector('.form-counter')) {
                    document.querySelector('.form-counter').textContent = '0/500';
                }
            });
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        });

        if (type === 'success') {
            notification.style.background = '#10b981';
        } else {
            notification.style.background = '#ef4444';
        }

        // Add to DOM and animate in
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    
    // Add floating animation delays to hero icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Initialize sections as hidden for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
    });
});