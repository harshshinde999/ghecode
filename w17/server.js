const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Read employee data from JSON file
async function getEmployeeData() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data', 'employees.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading employee data:', error);
        return [];
    }
}

// API Routes
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await getEmployeeData();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 