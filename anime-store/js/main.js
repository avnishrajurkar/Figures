// AniCollect - Main JavaScript
// Manga/Anime style interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Button animation
            this.textContent = 'ADDED!';
            this.style.background = '#c41e3a';
            
            setTimeout(() => {
                this.textContent = 'ADD TO CART';
                this.style.background = '';
            }, 1500);
            
            // Cart bounce animation
            cartCountElement.parentElement.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCountElement.parentElement.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                const btn = this.querySelector('button');
                btn.querySelector('span').textContent = 'SUBSCRIBED!';
                btn.style.background = '#2d5016';
                
                setTimeout(() => {
                    btn.querySelector('span').textContent = 'SUBSCRIBE';
                    btn.style.background = '';
                    this.reset();
                }, 2000);
            }
        });
    }
    
    // Parallax effect for manga panels
    const panels = document.querySelectorAll('.panel');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        panels.forEach((panel, index) => {
            const speed = (index + 1) * 0.1;
            panel.style.transform = `translateY(${scrolled * speed}px) rotate(${index % 2 === 0 ? '-' : ''}${5 + index}deg)`;
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards and category cards
    const animateElements = document.querySelectorAll('.product-card, .category-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Title text scramble effect on hover
    const impactTexts = document.querySelectorAll('.impact-text');
    impactTexts.forEach(text => {
        const originalText = text.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        
        text.addEventListener('mouseenter', function() {
            let iterations = 0;
            const interval = setInterval(() => {
                this.textContent = this.textContent.split('')
                    .map((letter, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                }
                
                iterations += 1/3;
            }, 30);
        });
    });
    
    // Speed lines intensity on scroll
    const speedLines = document.querySelector('.speed-lines');
    if (speedLines) {
        window.addEventListener('scroll', function() {
            const scrollSpeed = Math.min(window.scrollY / 100, 1);
            speedLines.style.opacity = 0.03 + (scrollSpeed * 0.1);
        });
    }
    
    // Category card special effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(196, 30, 58, 0.3);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            ripple.style.left = `${x - 10}px`;
            ripple.style.top = `${y - 10}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(15);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Product image hover zoom
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.overflow = 'visible';
            const art = this.querySelector('.placeholder-art');
            if (art) {
                art.style.transform = 'scale(1.1)';
                art.style.transition = 'transform 0.3s ease';
            }
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.overflow = 'hidden';
            const art = this.querySelector('.placeholder-art');
            if (art) {
                art.style.transform = 'scale(1)';
            }
        });
    });
    
    // Navigation active state on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) || 
                (current === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    });
    
    // Random cherry blossom petals for Demon Slayer theme
    function createPetal() {
        const petal = document.createElement('div');
        petal.style.cssText = `
            position: fixed;
            width: 15px;
            height: 15px;
            background: linear-gradient(45deg, #ffb7c5, #ff69b4);
            border-radius: 15px 0px;
            opacity: 0.8;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * 100}vw;
            top: -20px;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(petal);
        
        const duration = 5000 + Math.random() * 5000;
        const endX = (Math.random() - 0.5) * 200;
        
        petal.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 0.8 },
            { transform: `translate(${endX}px, ${window.innerHeight + 20}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-in'
        });
        
        setTimeout(() => petal.remove(), duration);
    }
    
    // Create petals periodically when on figures page
    if (window.location.pathname.includes('figures.html')) {
        setInterval(createPetal, 800);
    }
    
    // Console easter egg
    console.log('%c🗡️ ANICOLLECT - Your Anime Collectibles Destination', 'font-size: 20px; font-weight: bold; color: #c41e3a;');
    console.log('%cBuilt with manga power! ⚡', 'font-size: 14px; color: #4a90d9;');
});
