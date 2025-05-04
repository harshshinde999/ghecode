// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const modal = document.getElementById('productModal');
const modalBody = modal.querySelector('.modal-body');
const closeButton = modal.querySelector('.close-button');

// State
let products = [];

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productsGrid.innerHTML = '<p class="error">Error loading products. Please try again later.</p>';
    }
}

// Display products in grid
function displayProducts(productsToShow) {
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <span class="product-category">${product.category}</span>
            </div>
        </div>
    `).join('');
}

// Show product details in modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-image">
        <div class="modal-info">
            <h2>${product.name}</h2>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <span class="category">${product.category}</span>
        </div>
    `;
    modal.style.display = 'block';
}

// Filter products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

// Event Listeners
searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', fetchProducts); 