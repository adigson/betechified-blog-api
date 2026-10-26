require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const articleRoutes = require('./middleware/routes/articleRoutes');

const app = express();
app.use(express.json());

// Root test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running live!' });
});

// Mount Routes
app.use('/articles', articleRoutes);

// Connect to MongoDB Atlas & Start Server
const PORT = process.env.PORT || 5000;
if (!/^mongodb(\+srv)?:\/\//.test(process.env.MONGODB_URI || '')) {
  console.error('MONGODB_URI must be a MongoDB connection string (mongodb:// or mongodb+srv://).');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exitCode = 1;
  });