const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Function to read user data
const getUserData = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users:', error);
        return [];
    }
};

// API Routes
app.get('/api/users', (req, res) => {
    const users = getUserData();
    res.json(users);
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 