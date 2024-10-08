const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json()); // For parsing application/json

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
const exploreRoute = require('./routes/explore');

// Use the explore route
app.use('/api/explore', exploreRoute);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
