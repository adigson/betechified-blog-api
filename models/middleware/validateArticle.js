const Joi = require('joi');

const articleJoiSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().min(2).optional(),
  tags: Joi.array().items(Joi.string()).optional()
});

const validateArticle = (req, res, next) => {
  const { error } = articleJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateArticle;