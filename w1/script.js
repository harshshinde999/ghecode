// Product data
const products = [
    {
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: '₹7,999',
        description: 'Noise-cancelling over-ear headphones.'
    },
    {
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: '₹12,999',
        description: 'Fitness tracking smartwatch.'
    },
    {
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: '₹2,499',
        description: 'Ergonomic gaming mouse.'
    },
    {
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: '₹1,999',
        description: 'Adjustable aluminium stand.'
    }
];

// Pagination settings
const itemsPerPage = 2;
let currentPage = 1;

// DOM Elements
const productTableBody = document.getElementById('productTableBody');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// Calculate total pages
const totalPages = Math.ceil(products.length / itemsPerPage);

// Function to display products
function displayProducts() {
    // Clear current products
    productTableBody.innerHTML = '';

    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get products for current page
    const currentProducts = products.slice(startIndex, endIndex);

    // Create table rows for each product
    currentProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Product Image">
                <img src="${product.image}" alt="Product" class="product-image">
            </td>
            <td data-label="Price">${product.price}</td>
            <td data-label="Description">${product.description}</td>
        `;
        productTableBody.appendChild(row);
    });

    // Update pagination info
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    // Update button states
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Event Listeners
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
    }
});

// Initial display
displayProducts(); 