// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');

// Form validation functions
function validateName(name) {
    return name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobile(mobile) {
    return /^\d{10}$/.test(mobile);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateDOB(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
}

// Show/Hide forms
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Registration form handling
document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const dob = document.getElementById('dob').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('regPassword').value;

    // Reset error messages
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    // Validate form
    let isValid = true;

    if (!validateName(name)) {
        document.getElementById('nameError').textContent = 'Name must be at least 3 characters and contain only letters';
        isValid = false;
    }

    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (!validateMobile(mobile)) {
        document.getElementById('mobileError').textContent = 'Please enter a valid 10-digit mobile number';
        isValid = false;
    }

    if (!validateDOB(dob)) {
        document.getElementById('dobError').textContent = 'You must be at least 18 years old';
        isValid = false;
    }

    if (!city.trim()) {
        document.getElementById('cityError').textContent = 'Please enter your city';
        isValid = false;
    }

    if (!address.trim()) {
        document.getElementById('addressError').textContent = 'Please enter your address';
        isValid = false;
    }

    if (!validatePassword(password)) {
        document.getElementById('regPasswordError').textContent = 'Password must be at least 6 characters long';
        isValid = false;
    }

    if (isValid) {
        // Create user object
        const user = {
            name,
            email,
            mobile,
            dob,
            city,
            address,
            password,
            username: email // Use email as username for simplicity
        };

        try {
            // Store in localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            if (users.some(u => u.email === email)) {
                document.getElementById('emailError').textContent = 'This email is already registered';
                return;
            }

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            // Simulate AJAX POST request
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                alert('Registration successful! Please login with your email address.');
                // Switch to login form
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                // Clear form
                e.target.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        }
    }
});

// Login form handling
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Reset error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Validate form
    let isValid = true;

    if (!username.trim()) {
        document.getElementById('usernameError').textContent = 'Please enter your email address';
        isValid = false;
    }

    if (!password.trim()) {
        document.getElementById('passwordError').textContent = 'Please enter your password';
        isValid = false;
    }

    if (isValid) {
        try {
            // Check credentials in localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === username && u.password === password);

            if (user) {
                // Simulate AJAX POST request
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, action: 'login' })
                });

                if (response.ok) {
                    // Store logged in user
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // Redirect to data list page
                    window.location.href = 'data-list.html';
                }
            } else {
                document.getElementById('passwordError').textContent = 'Invalid email or password';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed. Please try again.');
        }
    }
}); 