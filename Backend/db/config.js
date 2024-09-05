// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/hostel");

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const dbURI = process.env.DB_URI;

if (!dbURI) {
    throw new Error('MongoDB connection string is missing in environment variables.');
}

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
