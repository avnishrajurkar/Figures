// ===== PRODUCT DATA =====
const products = [
    {
        id: 1,
        title: "Monkey D. Luffy - Gear 5 Figure",
        anime: "onepiece",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1608889476561-6242cfcbf43e?w=400",
        description: "Premium figure of Luffy in his incredible Gear 5 form. Highly detailed with multiple articulation points.",
        type: "figure"
    },
    {
        id: 2,
        title: "Roronoa Zoro - Three Sword Style",
        anime: "onepiece",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f8af6?w=400",
        description: "Zoro wielding his three swords in an epic battle pose. Limited edition collectible.",
        type: "figure"
    },
    {
        id: 3,
        title: "Tanjiro Kamado - Water Breathing",
        anime: "demonslayer",
        price: 279.99,
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400",
        description: "Tanjiro performing Water Breathing technique with flowing effects included.",
        type: "figure"
    },
    {
        id: 4,
        title: "Naruto Uzumaki - Hokage Cloak",
        anime: "naruto",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400",
        description: "Official replica of Naruto's Seventh Hokage cloak. High-quality fabric with embroidered details.",
        type: "fashion"
    },
    {
        id: 5,
        title: "Goku - Super Saiyan Blue",
        anime: "dragonball",
        price: 329.99,
        image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=400",
        description: "Goku in his powerful Super Saiyan Blue form with energy aura effect parts.",
        type: "figure"
    },
    {
        id: 6,
        title: "Levi Ackerman - ODM Gear",
        anime: "attackontitan",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
        description: "Captain Levi with full ODM gear setup. Includes multiple blades and gas canisters.",
        type: "figure"
    },
    {
        id: 7,
        title: "Gojo Satoru - Blindfold Ver.",
        anime: "jujutsukaisen",
        price: 319.99,
        image: "https://images.unsplash.com/photo-1620553957705-a6b8da6babda?w=400",
        description: "The strongest sorcerer Gojo Satoru with his signature blindfold. Premium quality figure.",
        type: "figure"
    },
    {
        id: 8,
        title: "Akatsuki Cloud Hoodie",
        anime: "naruto",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
        description: "Iconic Akatsuki organization hoodie with cloud pattern. Comfortable and stylish.",
        type: "fashion"
    },
    {
        id: 9,
        title: "Straw Hat Replica",
        anime: "onepiece",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400",
        description: "Luffy's iconic straw hat. Perfect replica for cosplay or display.",
        type: "accessory"
    },
    {
        id: 10,
        title: "Demon Slayer Corps Uniform",
        anime: "demonslayer",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1614713568397-b31dc5a1e5c0?w=400",
        description: "Full Demon Slayer Corps uniform set. Authentic design with button details.",
        type: "fashion"
    },
    {
        id: 11,
        title: "Dragon Ball Set (7 Stars)",
        anime: "dragonball",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1610419040528-689c18c52f4e?w=400",
        description: "Complete set of 7 Dragon Balls with LED illumination. Summon Shenron!",
        type: "collectible"
    },
    {
        id: 12,
        title: "Survey Corps Jacket",
        anime: "attackontitan",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
        description: "Official Survey Corps jacket with Wings of Freedom emblem. Premium quality.",
        type: "fashion"
    }
];

// ===== CART STATE =====
let cart = [];
let currentProduct = null;

// ===== LOADING SCREEN =====
const loaders = ['loader-op', 'loader-dbz', 'loader-naruto', 'loader-ds'];
let currentLoaderIndex = 0;

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Randomly select a loader
    currentLoaderIndex = Math.floor(Math.random() * loaders.length);
    showLoader(loaders[currentLoaderIndex]);
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
}

function showLoader(loaderId) {
    loaders.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
    
    const activeLoader = document.getElementById(loaderId);
    if (activeLoader) activeLoader.classList.add('active');
}

// Show different loader on page navigation
function showRandomLoader(callback) {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';
    loadingScreen.classList.remove('hidden');
    
    // Random loader
    const randomIndex = Math.floor(Math.random() * loaders.length);
    showLoader(loaders[randomIndex]);
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            if (callback) callback();
        }, 500);
    }, 2000);
}

// ===== AUTH MODAL =====
function openAuthModal() {
    document.getElementById('auth-modal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
}

function showLogin() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('signup-form').classList.remove('active');
    document.querySelectorAll('.auth-tab')[0].classList.add('active');
    document.querySelectorAll('.auth-tab')[1].classList.remove('active');
}

function showSignup() {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('signup-form').classList.add('active');
    document.querySelectorAll('.auth-tab')[0].classList.remove('active');
    document.querySelectorAll('.auth-tab')[1].classList.add('active');
}

// ===== PRODUCT MODAL =====
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-title').textContent = product.title;
    document.getElementById('detail-anime').textContent = product.anime.replace(/([a-z])([A-Z])/g, '$1 $2');
    document.getElementById('detail-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('detail-desc').textContent = product.description;
    
    // Show/hide size selector based on product type
    const sizeSection = document.getElementById('size-section');
    if (product.type === 'fashion') {
        sizeSection.style.display = 'block';
    } else {
        sizeSection.style.display = 'none';
    }
    
    document.getElementById('product-modal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    currentProduct = null;
}

function addToCartFromDetail() {
    if (!currentProduct) return;
    
    const qty = parseInt(document.getElementById('detail-qty').value) || 1;
    const size = document.getElementById('detail-size').value;
    
    addToCart(currentProduct, qty, size);
    closeProductModal();
}

// ===== CART FUNCTIONS =====
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function addToCart(product, qty = 1, size = null) {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({
            ...product,
            qty,
            size
        });
    }
    
    updateCart();
    
    // Show notification
    showNotification('Added to cart!');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    
    let total = 0;
    let count = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                ${item.size ? `<div>Size: ${item.size}</div>` : ''}
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.qty}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        
        cartItems.appendChild(itemEl);
    });
    
    cartCount.textContent = count;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--onepiece-primary);
        color: white;
        padding: 1rem 2rem;
        border: 2px solid var(--manga-black);
        box-shadow: 4px 4px 0 var(--manga-black);
        z-index: 5000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== RENDER PRODUCTS =====
function renderProducts(containerId, filter = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let filteredProducts = products;
    
    if (filter) {
        filteredProducts = products.filter(p => {
            if (filter.type) return p.type === filter.type;
            if (filter.anime) return p.anime === filter.anime;
            return true;
        });
    }
    
    container.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <button class="view-btn" onclick="openProductModal(${product.id})">View Details</button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-anime">${product.anime.replace(/([a-z])([A-Z])/g, '$1 $2')}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(products.find(p => p.id === ${product.id}))">Add to Cart</button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--manga-black)';
        navLinks.style.padding = '1rem';
    }
}

// ===== PAGE NAVIGATION WITH LOADER =====
function navigateToPage(url) {
    showRandomLoader(() => {
        window.location.href = url;
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    renderProducts('featured-products');
    
    // Close modals on outside click
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    }
    
    // Form submissions
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Login successful! Welcome back!');
        closeAuthModal();
    });
    
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Account created! Welcome to the crew!');
        closeAuthModal();
    });
    
    // Newsletter form
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Subscribed! Stay tuned for updates!');
    });
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        showNotification('Proceeding to checkout...');
        // Backend integration later
    });
});

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, cart, addToCart, renderProducts };
}
