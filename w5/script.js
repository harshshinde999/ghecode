document.addEventListener('DOMContentLoaded', function() {
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card').forEach(card => {
        // Add data-category attribute to each card based on its category text
        const categoryText = card.querySelector('.category').textContent.toLowerCase();
        card.closest('.col-6').setAttribute('data-category', categoryText);
    });

    // Category filtering
    const categoryLinks = document.querySelectorAll('[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active state in dropdown
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update dropdown button text
            const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
            dropdownButton.innerHTML = `<i class="fas fa-filter me-2"></i>${this.textContent}`;
            
            // Filter products
            const products = document.querySelectorAll('.col-6');
            products.forEach(product => {
                if (selectedCategory === 'all' || product.getAttribute('data-category') === selectedCategory) {
                    product.style.display = '';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Sorting functionality
    const sortLinks = document.querySelectorAll('[data-sort]');
    sortLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sortType = this.getAttribute('data-sort');
            
            // Update active state in dropdown
            sortLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update dropdown button text
            const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
            dropdownButton.innerHTML = `<i class="fas fa-sort me-2"></i>${this.textContent}`;
            
            // Get all visible products
            const products = Array.from(document.querySelectorAll('.col-6')).filter(p => p.style.display !== 'none');
            
            // Sort products
            products.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^0-9.-]+/g, ''));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^0-9.-]+/g, ''));
                const ratingA = parseFloat(a.querySelector('.rating span').textContent.match(/[\d.]+/)[0]);
                const ratingB = parseFloat(b.querySelector('.rating span').textContent.match(/[\d.]+/)[0]);
                
                switch(sortType) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'rating':
                        return ratingB - ratingA;
                    default:
                        return 0;
                }
            });
            
            // Reorder products in the DOM
            const productGrid = document.querySelector('.row.g-4');
            products.forEach(product => {
                productGrid.appendChild(product);
            });
        });
    });

    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = searchInput.nextElementSibling;
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.col-6');
        
        products.forEach(product => {
            const title = product.querySelector('.card-title').textContent.toLowerCase();
            const description = product.querySelector('.card-text').textContent.toLowerCase();
            const category = product.querySelector('.category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}); 