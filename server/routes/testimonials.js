
const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use the same uploads directory as main server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Get all testimonials
router.get('/', async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
});

// Get featured testimonials for home page
router.get('/featured', async (req, res) => {
  const testimonials = await Testimonial.find({ featured: true }).limit(3).sort({ createdAt: -1 });
  res.json(testimonials);
});


// Add new testimonial (with image upload)
router.post('/', upload.single('image'), async (req, res) => {
  const { quote, name, designation, featured } = req.body;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  
  // Ensure only 3 testimonials can be featured
  if (featured === 'true') {
    const featuredCount = await Testimonial.countDocuments({ featured: true });
    if (featuredCount >= 3) {
      return res.status(400).json({ error: 'Only 3 testimonials can be featured. Please unfeature another testimonial first.' });
    }
  }
  
  const testimonial = new Testimonial({ 
    quote, 
    name, 
    designation, 
    image: imageUrl,
    featured: featured === 'true'
  });
  await testimonial.save();
  res.status(201).json(testimonial);
});

// Update testimonial (with image upload)
router.put('/:id', upload.single('image'), async (req, res) => {
  const { quote, name, designation, featured } = req.body;
  let update = { quote, name, designation, featured: featured === 'true' };
  
  // Check featured limit when updating to featured
  if (featured === 'true') {
    const currentTestimonial = await Testimonial.findById(req.params.id);
    if (!currentTestimonial.featured) { // Only check if changing from non-featured to featured
      const featuredCount = await Testimonial.countDocuments({ featured: true });
      if (featuredCount >= 3) {
        return res.status(400).json({ error: 'Only 3 testimonials can be featured. Please unfeature another testimonial first.' });
      }
    }
  }
  
  if (req.file) {
    update.image = `/uploads/${req.file.filename}`;
  } else if (req.body.image) {
    update.image = req.body.image;
  }
  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true }
  );
  res.json(testimonial);
});

// Delete testimonial
router.delete('/:id', async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
