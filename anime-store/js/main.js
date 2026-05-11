// Main JavaScript for AniCollect

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initCart();
    initAnimations();
    initProductCards();
    initNewsletter();
});

// Navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Active link highlighting on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
}

// Cart functionality
let cartCount = 0;

function initCart() {
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const cartCountElement = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                
                // Animation for cart count
                cartCountElement.style.animation = 'none';
                setTimeout(() => {
                    cartCountElement.style.animation = 'pulse 0.5s ease';
                }, 10);
            }
            
            // Button feedback animation
            this.textContent = 'Added! ✓';
            this.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '';
            }, 2000);
        });
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add specific animation classes based on element type
                if (entry.target.classList.contains('category-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                } else if (entry.target.classList.contains('product-card')) {
                    entry.target.style.animation = 'zoomIn 0.6s ease-out forwards';
                } else if (entry.target.classList.contains('anime-card')) {
                    entry.target.style.animation = 'slideInRight 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.category-card, .product-card, .anime-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Product card interactions
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover sound effect simulation (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        // Click effect
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn-add-cart')) {
                // Simulate navigation to product detail page
                console.log('Navigate to product detail');
            }
        });
    });
}

// Newsletter form handling
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = 'Subscribed! ✓';
                button.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                emailInput.value = '';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 3000);
                
                console.log('Newsletter subscription:', email);
            }
        });
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const floatItems = document.querySelectorAll('.float-item');
        
        floatItems.forEach((item, index) => {
            const speed = (index + 1) * 0.5;
            item.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
});

// Category filter animation
function filterCategory(category) {
    const cards = document.querySelectorAll('.category-card, .product-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-out forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search functionality placeholder
function searchProducts(query) {
    console.log('Searching for:', query);
    // Implement search logic here
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading images (for future implementation with real images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Anime-specific effects
function triggerAnimeEffect(animeSeries) {
    const effects = {
        'demon-slayer': () => {
            document.body.style.animation = 'flashRed 0.5s ease';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
        },
        'one-piece': () => {
            createParticles('🏴‍☠️');
        },
        'naruto': () => {
            createParticles('🍥');
        },
        'dbz': () => {
            document.body.style.filter = 'brightness(1.2) contrast(1.1)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 1000);
        }
    };
    
    if (effects[animeSeries]) {
        effects[animeSeries]();
    }
}

// Particle effect creator
function createParticles(emoji) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.textContent = emoji;
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = 'float 2s ease-out forwards';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes flashRed {
        0%, 100% {
            filter: none;
        }
        50% {
            filter: sepia(1) hue-rotate(-50deg) saturate(3);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

console.log('AniCollect initialized successfully! 🎌');
