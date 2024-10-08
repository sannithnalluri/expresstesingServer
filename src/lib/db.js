const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGO_DB_NAME, // Only keep dbName here
      });
      console.log('MongoDB connected');
    } else {
      console.log('Already connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection failed');
  }
};

module.exports = connectDB;
