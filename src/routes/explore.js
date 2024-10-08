const express = require('express');
const router = express.Router();
const ExploreModel = require('../models/ExploreModel');
const connectDB = require('../lib/db');

// GET /api/explore - Fetch all explore posts
router.get('/', async (req, res) => {
  try {
    console.log('GET request received for fetching explore feed posts.');

    // Connect to the database
    await connectDB();
    console.log('Database connection successful.');

    // Retrieve all explore feed posts
    const posts = await ExploreModel.find();
    console.log('Posts retrieved from MongoDB:', posts);

    // Check if posts exist
    if (!posts || posts.length === 0) {
      console.warn('No explore feed posts found.');
      return res.status(404).json({ message: 'No posts found' });
    }

    // Return the retrieved posts
    console.log('Returning posts to the client.');
    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Error occurred while fetching explore posts:', error);
    return res.status(500).json({ message: 'Failed to fetch explore posts', error: error.message });
  }
});

// POST /api/explore - Add a new explore post
// POST /api/explore - Add a new explore post
router.post('/', async (req, res) => {
    try {
        console.log('Request headers:', req.headers);
        console.log('Request body:', req.body);
      console.log('POST request received to add a new explore post.');
  
      // Connect to the database
      await connectDB();
      console.log('Database connection successful.');
  
      // Get the post data from the request body
      const { title, description } = req.body;
  
      // Validate the data
      if (!title || !description) {
        console.log('Validation failed:', { title, description });  // Log the received values
        return res.status(400).json({ message: 'Title and description are required' });
      }
  
      // Create a new post
      const newPost = new ExploreModel({ title, description });
  
      // Save the post to the database
      await newPost.save();
      console.log('New post saved to MongoDB:', newPost);
  
      // Return the created post
      return res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error occurred while adding new post:', error);
      return res.status(500).json({ message: 'Failed to add post', error: error.message });
    }
  });
  

module.exports = router;
