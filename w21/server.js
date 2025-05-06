const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file (optional, but useful)
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection for local setup
mongoose.connect('mongodb://localhost:27017/bookstoreDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) // Use your own local database name
  .then(() => console.log('Connected to MongoDB locally'))  // Correct message for local MongoDB
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const bookRoutes = require('./routes/books');

// Use routes for the '/api/books' endpoint
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
