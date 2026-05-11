// AniCollect - Premium Anime Store JavaScript
// Advanced animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // COUNTER ANIMATION FOR STATS
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    // ========================================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // PARALLAX EFFECT FOR BACKGROUND ELEMENTS
    // ========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for straw hat
        const strawHat = document.querySelector('.straw-hat-floating');
        if (strawHat) {
            strawHat.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Parallax for ship
        const ship = document.querySelector('.ship-sailing');
        if (ship) {
            ship.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Parallax for shuriken
        const shuriken = document.querySelector('.shuriken-spin');
        if (shuriken) {
            shuriken.style.transform = `rotate(${scrolled * 0.5}deg)`;
        }
    });

    // ========================================
    // CART FUNCTIONALITY
    // ========================================
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    
    // Add to cart functionality (will be enhanced with backend later)
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Add to Cart') || 
                this.textContent.includes('Buy Now') ||
                this.textContent.includes('Explore') ||
                this.textContent.includes('View')) {
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Increment cart (demo only)
                if (!this.classList.contains('btn-secondary')) {
                    cartCount++;
                    if (cartCountElement) {
                        cartCountElement.textContent = cartCount;
                        cartCountElement.style.animation = 'none';
                        setTimeout(() => {
                            cartCountElement.style.animation = 'pulse 0.5s ease-in-out';
                        }, 10);
                    }
                }
            }
        });
    });

    // ========================================
    // NEWSLETTER FORM HANDLING
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Show success message
                const btn = this.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Domain Activated! ✓';
                btn.style.background = '#27ae60';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    emailInput.value = '';
                }, 2000);
            }
        });
    }

    // ========================================
    // HOVER EFFECTS FOR COLLECTION CARDS
    // ========================================
    const collectionCards = document.querySelectorAll('.collection-card');
    
    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const bg = this.querySelector('.collection-bg');
            if (bg) {
                bg.style.transform = 'scale(1.1)';
                bg.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const bg = this.querySelector('.collection-bg');
            if (bg) {
                bg.style.transform = 'scale(1)';
            }
        });
    });

    // ========================================
    // GLITCH EFFECT ENHANCEMENT
    // ========================================
    const glitchTitle = document.querySelector('.glitch-effect');
    if (glitchTitle) {
        setInterval(() => {
            glitchTitle.style.textShadow = `${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0px rgba(255, 0, 0, 0.5)`;
            setTimeout(() => {
                glitchTitle.style.textShadow = '';
            }, 100);
        }, 3000);
    }

    // ========================================
    // FASHION ITEM REVEAL ANIMATION
    // ========================================
    const fashionItems = document.querySelectorAll('.fashion-item');
    
    const fashionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                fashionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fashionItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
        fashionObserver.observe(item);
    });

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = '';
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // DYNAMIC PARTICLE SYSTEM FOR BACKGROUNDS
    // ========================================
    function createParticles(containerClass, count = 20) {
        const container = document.querySelector(containerClass);
        if (!container) return;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.pointerEvents = 'none';
            
            // Animate particles
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.animation = `particleFloat ${duration}s ease-in-out ${delay}s infinite`;
            
            container.appendChild(particle);
        }
    }

    // Add particle system keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            50% {
                transform: translateY(-100px) translateX(50px);
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize particles for different sections
    createParticles('.one-piece-bg', 15);
    createParticles('.naruto-theme-bg', 20);
    createParticles('.jjk-theme-bg', 25);

    // ========================================
    // PRODUCT FILTER FUNCTIONALITY (For Figures Page)
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========================================
    // FAQ ACCORDION FUNCTIONALITY (For About Page)
    // ========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other answers
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = '0';
            });
            
            // Toggle current answer
            if (!isActive) {
                this.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ========================================
    // CONTACT FORM VALIDATION (For Contact Page)
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            if (name && email && message) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = '#27ae60';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }
        });
    }

    console.log('🏴‍☠️ AniCollect - Ready to set sail for premium collectibles!');
});
