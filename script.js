// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Enhanced Profile Image Interactions
document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.image-container');
    
    if (imageContainer) {
        // Add touch interactions for mobile
        if ('ontouchstart' in window) {
            imageContainer.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 35px 70px rgba(102, 126, 234, 0.3)';
            });
            
            imageContainer.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
            });
        }
        
        // Add click interaction for desktop
        imageContainer.addEventListener('click', function() {
            if (!('ontouchstart' in window)) {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 35px 70px rgba(102, 126, 234, 0.3)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
                }, 200);
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Stats Animation - Premium Version
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statItems = document.querySelectorAll('.stat-item');
    
    const animateNumbers = () => {
        statNumbers.forEach((stat, index) => {
            // Add staggered animation delay
            setTimeout(() => {
                const target = parseInt(stat.textContent);
                const increment = target / 60;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('%') ? '%' : stat.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                        
                        // Add pulse animation when number completes
                        stat.style.animation = 'statPulse 0.6s ease';
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : stat.textContent.includes('+') ? '+' : '');
                    }
                }, 25);
            }, index * 200); // Stagger each stat by 200ms
        });
    };
    
    // Add entrance animation to stat items
    const animateStatItems = () => {
        statItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
    };
    
    // Animate when portfolio section comes into view
    const portfolioSection = document.querySelector('.portfolio');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatItems();
                setTimeout(animateNumbers, 300); // Start numbers after items animate
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (portfolioSection) {
        observer.observe(portfolioSection);
    }
    
    // Add hover effects for mobile
    if ('ontouchstart' in window) {
        statItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.15)';
            });
        });
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.section-header, .about-text, .skill-item, .portfolio-item, .book-card, .contact-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar background on scroll
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

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Book purchase simulation
document.querySelectorAll('.book-actions .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Let the link work normally - no need to prevent default
        // The link will open the Selar cart page
    });
});

// Image Modal functionality
function openImageModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalTitle.textContent = title;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking the X
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageModal);
    }
    
    // Close modal when clicking outside the image
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeImageModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
});

// Portfolio item click handling

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Parallax effect for hero elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading screen
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Add loading screen to HTML if not present
if (!document.querySelector('.loading')) {
    const loadingHTML = `
        <div class="loading">
            <div class="loader"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
}

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.section-header, .about-text, .skill-item, .portfolio-item, .book-card, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Initialize scroll animations
    revealOnScroll();
});

// Social media link handlers
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Let the links work normally - they will open the social media profiles
        // No need to prevent default behavior
    });
});

// WhatsApp and Email link handlers
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Let the links work normally - they will open WhatsApp or email client
        // No need to prevent default behavior
    });
});

// Add some interactive hover effects
document.querySelectorAll('.portfolio-item, .book-card, .skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Console welcome message
console.log('%cWelcome to Gabriel Kibali\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion and creativity', 'color: #764ba2; font-size: 14px;');
