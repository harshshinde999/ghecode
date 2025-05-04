const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb+srv://swikarjadhav14:practical@cluster0.qzxnly2.mongodb.net/employee_management')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const employeeRoutes = require('./routes/employees');

// Use routes
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 