// Shop page functionality
let products = [];
let cart = [];
let filteredProducts = [];

// Sample products data
const sampleProducts = [
    {
        id: 1,
        name: 'Fresh Tomatoes',
        category: 'fruit',
        price: 40,
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Juicy, ripe tomatoes perfect for salads and cooking',
        badge: 'Organic'
    },
    {
        id: 2,
        name: 'Green Spinach',
        category: 'leafy',
        price: 30,
        image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Fresh baby spinach leaves, rich in iron and vitamins',
        badge: 'Fresh'
    },
    {
        id: 3,
        name: 'Organic Carrots',
        category: 'root',
        price: 25,
        image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Sweet, crunchy carrots grown without pesticides',
        badge: 'Organic'
    },
    {
        id: 4,
        name: 'Bell Peppers',
        category: 'fruit',
        price: 80,
        image: 'https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Colorful mix of red, yellow, and green bell peppers',
        badge: 'Mixed'
    },
    {
        id: 5,
        name: 'Fresh Broccoli',
        category: 'leafy',
        price: 60,
        image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Nutritious broccoli crowns, perfect for steaming',
        badge: 'Fresh'
    },
    {
        id: 6,
        name: 'Red Onions',
        category: 'root',
        price: 20,
        image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Sharp, flavorful red onions for cooking and salads',
        badge: 'Local'
    },
    {
        id: 7,
        name: 'Fresh Basil',
        category: 'herbs',
        price: 35,
        image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Aromatic fresh basil leaves for cooking and garnish',
        badge: 'Herbs'
    },
    {
        id: 8,
        name: 'Cucumber',
        category: 'fruit',
        price: 15,
        image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Crisp, refreshing cucumbers perfect for salads',
        badge: 'Fresh'
    },
    {
        id: 9,
        name: 'Sweet Potatoes',
        category: 'root',
        price: 45,
        image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Nutritious orange sweet potatoes, naturally sweet',
        badge: 'Organic'
    },
    {
        id: 10,
        name: 'Lettuce Mix',
        category: 'leafy',
        price: 50,
        image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Mixed lettuce varieties for fresh, crispy salads',
        badge: 'Mixed'
    },
    {
        id: 11,
        name: 'Fresh Cilantro',
        category: 'herbs',
        price: 18,
        image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Fresh cilantro leaves with bright, citrusy flavor',
        badge: 'Herbs'
    },
    {
        id: 12,
        name: 'Zucchini',
        category: 'fruit',
        price: 35,
        image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Tender zucchini perfect for grilling and baking',
        badge: 'Fresh'
    }
];

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('shop.html')) {
        initializeShop();
    }
});

function initializeShop() {
    products = [...sampleProducts];
    filteredProducts = [...products];
    renderProducts();
    updateCartDisplay();
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-badge">${product.badge}</div>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-price">₹${product.price}</div>
            <div class="product-actions">
                <button class="btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="btn-secondary" onclick="viewProduct(${product.id})">
                    <i class="fas fa-eye"></i> View
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartSummary = document.getElementById('cartSummary');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartSummary || !cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartSummary.style.display = 'none';
        return;
    }
    
    cartSummary.style.display = 'block';
    
    // Render cart items
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
            </div>
            <div>
                <button onclick="removeFromCart(${item.id})" style="background: #ef4444; color: white; border: none; padding: 5px 8px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartDisplay();
    showNotification('Cart cleared!', 'info');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate checkout process
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Order placed successfully! Total: ₹${total}`, 'success');
    
    // Clear cart after successful checkout
    setTimeout(() => {
        clearCart();
    }, 2000);
}

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === selectedCategory);
    }
    
    renderProducts();
}

function sortProducts() {
    const sortFilter = document.getElementById('sortFilter');
    const sortBy = sortFilter.value;
    
    switch (sortBy) {
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }
    
    renderProducts();
}

function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create modal for product details
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${product.name}</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
                <p style="font-size: 1.1rem; color: #6b7280; margin-bottom: 15px;">${product.description}</p>
                <div style="font-size: 2rem; font-weight: bold; color: #16a34a; margin-bottom: 20px;">$${product.price.toFixed(2)}</div>
                <button class="btn-primary" onclick="addToCart(${product.id}); closeModal();" style="width: 100%; padding: 15px; font-size: 1.1rem;">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        animation: slideInUp 0.3s ease-out;
    `;
    
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e5e7eb;
    `;
    
    const modalClose = modal.querySelector('.modal-close');
    modalClose.style.cssText = `
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// Add modal animations
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(modalStyle);
