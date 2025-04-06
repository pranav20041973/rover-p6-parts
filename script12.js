const products = [
  {
    id: 1,
    name: 'Rover P6 Front Brake Discs',
    price: 129.99,
    image: 'https://shop.roverp6cars.com/WebRoot/epagesUK/Shops/es146747/5009/DC6C/D9EF/29B3/E62B/0A0F/110C/17F3/601959.JPG',
    description: 'High-quality front brake discs for Rover P6 2000/2200/3500 models. Direct replacement part. Manufactured to original specifications with premium materials for optimal performance and longevity.',
    category: 'Brakes',
    stock: 8
  },
  {
    id: 2,
    name: 'P6 Steering Rack Boot Kit',
    price: 24.99,
    image: 'https://shop.roverp6cars.com/WebRoot/epagesUK/Shops/es146747/5795/D6F6/1ABA/EE6E/0B4C/0A0F/1119/AD5D/368429.jpg',
    description: 'Complete steering rack boot kit for all P6 models. Includes boots and clips. Made from durable rubber compound to withstand harsh conditions and prevent dirt ingress.',
    category: 'Steering',
    stock: 15
  },
  {
    id: 3,
    name: 'Rover P6 Oil Filter',
    price: 12.99,
    image: 'https://shop.roverp6cars.com/WebRoot/epagesUK/Shops/es146747/5032/C84A/65C7/7CCF/A7CC/0A0F/1116/A926/GFE145.JPG',
    description: 'Genuine specification oil filter for all P6 engines. Regular replacement recommended every 3,000 miles or 6 months. High-efficiency filtration media for optimal engine protection.',
    category: 'Engine',
    stock: 25
  },
  {
    id: 4,
    name: 'P6 Front Suspension Bush Kit',
    price: 89.99,
    image: 'https://shop.roverp6cars.com/WebRoot/epagesUK/Shops/es146747/5065/7ABC/4BE8/E220/5DDD/0A0F/1115/DCD2/565395.jpg',
    description: 'Complete front suspension bush kit for improved handling. Includes all necessary bushes. Manufactured from high-grade polyurethane for increased durability over original rubber components.',
    category: 'Suspension',
    stock: 6
  },
  {
    id: 5,
    name: 'P6 2000/2200 Exhaust System',
    price: 299.99,
    image: 'https://shop.roverp6cars.com/WebRoot/epagesUK/Shops/es146747/5013/9E29/1A8F/B581/94F3/0A0F/1116/960C/506046.JPG',
    description: 'Complete stainless steel exhaust system for P6 2000/2200 models. Lifetime warranty against manufacturing defects. Precision engineered for perfect fitment and enhanced exhaust flow.',
    category: 'Exhaust',
    stock: 3
  },
  {
    id: 6,
    name: 'P6 3500 V8 Inlet Manifold',
    price: 245.00,
    image: 'https://shop.roverp6cars.com/WebRoot/epagesUK/Shops/es146747/581A/017D/7E31/715B/2909/0A0F/1117/3784/ERR7283.jpg',
    description: 'Original specification inlet manifold for P6 3500 V8. Fully reconditioned with new gaskets and seals. Pressure tested and guaranteed leak-free installation.',
    category: 'Engine',
    stock: 2
  },
  {
    id: 7,
    name: 'P6 Brake Master Cylinder',
    price: 189.99,
    image: 'https://shop.roverp6cars.com/WebRoot/epagesUK/Shops/es146747/5A2A/9577/4B25/2EBB/33B5/0A0F/111B/0E2F/565668.jpg',
    description: 'New brake master cylinder for all P6 models. Improved reliability and safety. Manufactured with modern materials for enhanced durability over original components.',
    category: 'Brakes',
    stock: 4
  },
  {
    id: 8,
    name: 'P6 Fuel Pump Assembly',
    price: 159.99,
    image: 'https://shop.roverp6cars.com/WebRoot/epagesUK/Shops/es146747/50F6/9685/8D29/D3E4/C978/0A0F/1117/33AE/602018.jpg',
    description: 'Complete fuel pump assembly for P6 models. Includes mounting hardware. Precision engineered to deliver correct fuel pressure and volume for optimal engine performance.',
    category: 'Fuel System',
    stock: 5
  }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProduct = null;
let currentQuantity = 1;

// DOM Elements
const productList = document.getElementById('productList');
const productDetails = document.getElementById('productDetails');
const mainContent = document.getElementById('mainContent');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const cartIcon = document.getElementById('cartIcon');
const notification = document.getElementById('notification');
const productQuantityInput = document.getElementById('productQuantity');

// Initialize the app
function init() {
  displayProducts(products);
  updateCartCount();
  setupEventListeners();
}

// Display products in grid view
function displayProducts(productsToShow) {
  productList.innerHTML = '';

  productsToShow.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>${product.description.substring(0, 100)}...</p>
      <div class="price">$${product.price.toFixed(2)}</div>
    `;
    div.addEventListener('click', () => showProductDetails(product));
    productList.appendChild(div);
  });
}

// Show detailed product view
function showProductDetails(product) {
  currentProduct = product;
  currentQuantity = 1;
  productQuantityInput.value = 1;
  
  document.getElementById('detailImage').src = product.image;
  document.getElementById('detailName').textContent = product.name;
  document.getElementById('detailCategory').textContent = product.category;
  document.getElementById('detailPrice').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('detailStock').textContent = `${product.stock} in stock`;
  document.getElementById('detailDescription').textContent = product.description;

  mainContent.classList.add('hidden');
  productDetails.classList.remove('hidden');
}

// Change quantity in product details view
function changeQuantity(change) {
  let newValue = parseInt(productQuantityInput.value) + change;
  
  // Validate new value
  newValue = Math.max(1, Math.min(currentProduct.stock, newValue));
  
  productQuantityInput.value = newValue;
  currentQuantity = newValue;
}

// Return to product list view
function showProductList() {
  mainContent.classList.remove('hidden');
  productDetails.classList.add('hidden');
  currentProduct = null;
}

// Filter products by category
function filterCategory(category) {
  if (category === 'All') {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

// Add item to cart
// Change this line in the product details HTML (or the function that handles it):
// From: <button class="add-btn" onclick="addToCart()">
// To: <button class="add-btn" onclick="addToCart(currentProduct.id, currentQuantity)">

// Or update the addToCart function to use the current product if no ID is provided:
function addToCart(productId = null, quantity = 1) {
  // If no productId provided, use currentProduct
  const product = productId ? products.find(p => p.id === productId) : currentProduct;
  if (!product) return;

  // Use the provided quantity or currentQuantity
  const qty = productId ? quantity : currentQuantity;

  // Check if already in cart
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    const newQuantity = existingItem.quantity + qty;
    if (newQuantity > product.stock) {
      showNotification(`Only ${product.stock - existingItem.quantity} more available`, 'error');
      return;
    }
    existingItem.quantity = newQuantity;
  } else {
    if (qty > product.stock) {
      showNotification(`Only ${product.stock} available`, 'error');
      return;
    }
    cart.push({
      ...product,
      quantity: qty
    });
  }

  saveCart();
  updateCartCount();
  showNotification(`${product.name} (${qty}) added to cart`);
}

// Buy now - adds to cart and opens cart
function buyNow() {
  const quantity = parseInt(productQuantityInput.value);
  addToCart(currentProduct.id, quantity);
  showCart();
}

// Show cart modal
function showCart() {
  renderCartItems();
  cartModal.classList.remove('hidden');
}

// Close cart modal
function closeCart() {
  cartModal.classList.add('hidden');
}

// Render cart items in modal
function renderCartItems() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    cartTotal.textContent = '$0.00';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <div>Qty: ${item.quantity}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
        <i class="fas fa-times"></i>
      </button>
    `;
    cartItems.appendChild(div);
  });

  // Update total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartCount();
  renderCartItems();
  showNotification('Item removed from cart');
}

// Proceed to checkout
function checkout() {
  if (cart.length === 0) {
    showNotification('Your cart is empty', 'error');
    return;
  }
  
  // In a real app, this would redirect to checkout page
  showNotification('Proceeding to checkout...');
  setTimeout(() => {
    closeCart();
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartCount();
  }, 1500);
}

// Update cart count in header
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Show notification
function showNotification(message, type = 'success') {
  notification.innerHTML = '';
  
  const icon = document.createElement('i');
  if (type === 'error') {
    icon.className = 'fas fa-exclamation-circle';
    notification.style.backgroundColor = 'var(--error)';
  } else if (type === 'warning') {
    icon.className = 'fas fa-exclamation-triangle';
    notification.style.backgroundColor = 'var(--warning)';
  } else {
    icon.className = 'fas fa-check-circle';
    notification.style.backgroundColor = 'var(--success)';
  }
  
  notification.appendChild(icon);
  notification.appendChild(document.createTextNode(message));
  
  notification.className = 'notification show';
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(search) || 
      p.description.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );
    displayProducts(filtered);
  });

  // Cart icon click
  cartIcon.addEventListener('click', showCart);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl + / to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
    // Esc to close modals
    if (e.key === 'Escape') {
      if (!cartModal.classList.contains('hidden')) {
        closeCart();
      }
    }
  });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);