// DOM Elements
const addBookForm = document.getElementById('addBookForm');
const booksList = document.getElementById('booksList');

// Fetch all books
async function fetchBooks() {
    try {
        const response = await fetch('/api/books');
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Display books in the list
function displayBooks(books) {
    booksList.innerHTML = '';
    books.forEach(book => {
        const bookElement = createBookElement(book);
        booksList.appendChild(bookElement);
    });
}

// Create book element
function createBookElement(book) {
    const div = document.createElement('div');
    div.className = 'book-item';
    div.innerHTML = `
        <div class="book-info">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Price: $${book.price}</p>
            <p>Genre: ${book.genre}</p>
        </div>
        <div class="book-actions">
            <button class="edit-btn" onclick="showEditForm('${book._id}')">Edit</button>
            <button class="delete-btn" onclick="deleteBook('${book._id}')">Delete</button>
        </div>
        <div id="edit-form-${book._id}" class="edit-form">
            <input type="text" id="edit-title-${book._id}" value="${book.title}" placeholder="Title">
            <input type="text" id="edit-author-${book._id}" value="${book.author}" placeholder="Author">
            <input type="number" id="edit-price-${book._id}" value="${book.price}" step="0.01" placeholder="Price">
            <input type="text" id="edit-genre-${book._id}" value="${book.genre}" placeholder="Genre">
            <button onclick="updateBook('${book._id}')">Save Changes</button>
            <button onclick="hideEditForm('${book._id}')">Cancel</button>
        </div>
    `;
    return div;
}

// Add new book
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        price: parseFloat(document.getElementById('price').value),
        genre: document.getElementById('genre').value
    };

    try {
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if (response.ok) {
            addBookForm.reset();
            fetchBooks();
        }
    } catch (error) {
        console.error('Error adding book:', error);
    }
});

// Show edit form
function showEditForm(bookId) {
    const editForm = document.getElementById(`edit-form-${bookId}`);
    editForm.classList.add('active');
}

// Hide edit form
function hideEditForm(bookId) {
    const editForm = document.getElementById(`edit-form-${bookId}`);
    editForm.classList.remove('active');
}

// Update book
async function updateBook(bookId) {
    const bookData = {
        title: document.getElementById(`edit-title-${bookId}`).value,
        author: document.getElementById(`edit-author-${bookId}`).value,
        price: parseFloat(document.getElementById(`edit-price-${bookId}`).value),
        genre: document.getElementById(`edit-genre-${bookId}`).value
    };

    try {
        const response = await fetch(`/api/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if (response.ok) {
            hideEditForm(bookId);
            fetchBooks();
        }
    } catch (error) {
        console.error('Error updating book:', error);
    }
}

// Delete book
async function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        try {
            const response = await fetch(`/api/books/${bookId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchBooks();
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
}

// Initial load
fetchBooks(); 