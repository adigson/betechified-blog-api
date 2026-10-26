require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./Article');

const seedArticles = [
  {
    title: 'Getting Started with APIs',
    content: 'A practical introduction to designing and building reliable web APIs.',
    author: 'BeTechified',
    tags: ['api', 'development']
  },
  {
    title: 'Launching a Blog API',
    content: 'Learn how to build, test, and deploy a blog API with Node.js and MongoDB.',
    author: 'BeTechified',
    tags: ['blog', 'deployment']
  }
];

async function seed() {
  if (!/^mongodb(\+srv)?:\/\//.test(process.env.MONGODB_URI || '')) {
    throw new Error('MONGODB_URI must be a MongoDB connection string (mongodb:// or mongodb+srv://).');
  }
  await mongoose.connect(process.env.MONGODB_URI);
  for (const article of seedArticles) {
    await Article.updateOne({ title: article.title }, { $set: article }, { upsert: true });
  }
  console.log(`Seeded ${seedArticles.length} articles`);
}

seed()
  .catch(error => {
    console.error('Failed to seed articles:', error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
