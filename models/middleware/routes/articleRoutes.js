const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../../Article');
const validateArticle = require('../validateArticle');

const isInvalidId = id => !mongoose.isValidObjectId(id);

// 🔍 BONUS ROUTE: Search articles by keyword
// GET /articles/search?q=keyword
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (typeof q !== 'string' || !q.trim()) {
      return res.status(400).json({ message: 'A non-empty query parameter q is required' });
    }

    const results = await Article.find({ $text: { $search: q.trim() } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1. CREATE Article (POST /articles) - With Joi Validation
router.post('/', validateArticle, async (req, res) => {
  try {
    const article = new Article(req.body);
    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. READ All Articles (GET /articles)
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. READ Single Article by ID (GET /articles/:id)
router.get('/:id', async (req, res) => {
  try {
    if (isInvalidId(req.params.id)) return res.status(400).json({ message: 'Invalid article ID' });
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. UPDATE Article by ID (PUT /articles/:id) - With Joi Validation
router.put('/:id', validateArticle, async (req, res) => {
  try {
    if (isInvalidId(req.params.id)) return res.status(400).json({ message: 'Invalid article ID' });
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedArticle) return res.status(404).json({ message: 'Article not found' });
    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE Article by ID (DELETE /articles/:id)
router.delete('/:id', async (req, res) => {
  try {
    if (isInvalidId(req.params.id)) return res.status(400).json({ message: 'Invalid article ID' });
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;