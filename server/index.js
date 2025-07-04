// All requires at the very top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// --- Features (Why Choose Our School) Schema and API ---
const featureSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});
const Feature = mongoose.model('Feature', featureSchema);

// Multer setup for image uploads (must be after fs, path, and multer are required)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const app = express();
app.use(cors());
app.use(express.json());

// Features routes must come after app is defined
// Get all features
app.get('/api/features', async (req, res) => {
  const features = await Feature.find();
  res.json(features);
});

// Add a new feature
app.post('/api/features', upload.single('image'), async (req, res) => {
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  const { title, description } = req.body;
  const feature = new Feature({ title, description, image: imageUrl });
  await feature.save();
  res.json(feature);
});

// Update a feature
app.put('/api/features/:id', upload.single('image'), async (req, res) => {
  let update = { ...req.body };
  if (req.file) {
    update.image = `/uploads/${req.file.filename}`;
  }
  const feature = await Feature.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(feature);
});

// Delete a feature
app.delete('/api/features/:id', async (req, res) => {
  await Feature.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- Logo Schema and API ---
const logoSchema = new mongoose.Schema({
  image: String,
});
const Logo = mongoose.model('Logo', logoSchema);

// Get logo (singleton)
app.get('/api/logo', async (req, res) => {
  let logo = await Logo.findOne();
  if (!logo) {
    logo = new Logo({ image: '' });
    await logo.save();
  }
  res.json(logo);
});

// Update logo (singleton)
app.put('/api/logo', upload.single('image'), async (req, res) => {
  let logo = await Logo.findOne();
  if (!logo) logo = new Logo();
  if (req.file) {
    // Delete old logo file if exists
    if (logo.image) {
      const oldPath = path.join(__dirname, logo.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    logo.image = `/uploads/${req.file.filename}`;
  }
  await logo.save();
  res.json(logo);
});

// Delete logo (singleton)
app.delete('/api/logo', async (req, res) => {
  let logo = await Logo.findOne();
  if (logo && logo.image) {
    const filePath = path.join(__dirname, logo.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    logo.image = '';
    await logo.save();
  }
  res.json({ success: true });
});

// Event Schema
const eventSchema = new mongoose.Schema({
  title: String,
  date: String, // e.g. 'MAR 25'
  time: String, // e.g. '7:00 PM'
  location: String
});
const Event = mongoose.model('Event', eventSchema);

// Event routes
app.get('/api/events', async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});
app.post('/api/events', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});
app.put('/api/events/:id', async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
});
app.delete('/api/events/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer error handler middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});


// Image or PDF upload endpoint (for results)
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Result Schema
const resultSchema = new mongoose.Schema({
  className: String, // e.g. 'Class 10', 'Class 12', etc.
  fileUrl: String,   // image or pdf url
  fileType: String,  // 'image' or 'pdf'
  date: { type: Date, default: Date.now }
});
const Result = mongoose.model('Result', resultSchema);

// Results CRUD API
app.get('/api/results', async (req, res) => {
  const results = await Result.find().sort({ date: -1 });
  res.json(results);
});
app.post('/api/results', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const { className } = req.body;
  const fileUrl = `/uploads/${req.file.filename}`;
  let fileType = 'other';
  if (req.file.mimetype.startsWith('image')) fileType = 'image';
  else if (
    req.file.mimetype === 'application/pdf' ||
    req.file.mimetype === 'application/x-pdf'
  ) fileType = 'pdf';
  const result = new Result({ className, fileUrl, fileType });
  await result.save();
  res.json(result);
});

// PUT endpoint for updating results
app.put('/api/results/:id', upload.single('file'), async (req, res) => {
  try {
    const { className } = req.body;
    const existingResult = await Result.findById(req.params.id);
    
    if (!existingResult) {
      return res.status(404).json({ error: 'Result not found' });
    }
    
    // Update basic fields
    existingResult.className = className || existingResult.className;
    
    // If new file uploaded, update file info
    if (req.file) {
      // Delete old file if it exists
      if (existingResult.fileUrl) {
        const oldFilePath = path.join(__dirname, existingResult.fileUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      
      // Set new file info
      existingResult.fileUrl = `/uploads/${req.file.filename}`;
      if (req.file.mimetype.startsWith('image')) {
        existingResult.fileType = 'image';
      } else if (
        req.file.mimetype === 'application/pdf' ||
        req.file.mimetype === 'application/x-pdf'
      ) {
        existingResult.fileType = 'pdf';
      } else {
        existingResult.fileType = 'other';
      }
    }
    
    await existingResult.save();
    res.json(existingResult);
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).json({ error: 'Failed to update result' });
  }
});

app.delete('/api/results/:id', async (req, res) => {
  const result = await Result.findByIdAndDelete(req.params.id);
  // Optionally delete file from disk
  if (result && result.fileUrl) {
    const filePath = path.join(__dirname, result.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  res.json({ success: true });
});

const noticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  showPopup: { type: Boolean, default: false },
  file: String, // File URL
  fileType: { type: String, enum: ['image', 'pdf', 'document', 'none'], default: 'none' },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  category: { type: String, default: 'General' },
  isUrgent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Notice = mongoose.model('Notice', noticeSchema);

// Database migration to add missing fields to existing notices
const migrateNotices = async () => {
  try {
    console.log('Running notice migration...');
    const result = await Notice.updateMany(
      { 
        $or: [
          { category: { $exists: false } },
          { priority: { $exists: false } },
          { isUrgent: { $exists: false } }
        ]
      },
      { 
        $set: { 
          category: 'General',
          priority: 'medium',
          isUrgent: false,
          updatedAt: new Date()
        }
      }
    );
    console.log(`Migration completed: ${result.modifiedCount} notices updated`);
  } catch (error) {
    console.error('Migration error:', error);
  }
};

// Run migration on server start
migrateNotices();


const galleryEventSchema = new mongoose.Schema({
  event: String,
  images: [String],
});
const GalleryEvent = mongoose.model('GalleryEvent', galleryEventSchema);

// News Schema
const newsSchema = new mongoose.Schema({
  title: String,
  excerpt: String, // short summary
  content: String, // rich text (HTML)
  image: String,   // image URL
  category: String,
  author: String,
  date: String, // user-supplied date string
  createdAt: { type: Date, default: Date.now },
});
const News = mongoose.model('News', newsSchema);
// News routes
app.get('/api/news', async (req, res) => {
  const { category } = req.query;
  let filter = {};
  if (category) filter.category = category;
  const news = await News.find(filter).sort({ createdAt: -1 });
  res.json(news);
});

app.get('/api/news/:id', async (req, res) => {
  const newsItem = await News.findById(req.params.id);
  if (!newsItem) return res.status(404).json({ error: 'Not found' });
  res.json(newsItem);
});


app.post('/api/news', upload.single('image'), async (req, res) => {
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  const { title, excerpt, content, category, author, date } = req.body;
  const news = new News({ title, excerpt, content, category, author, date, image: imageUrl });
  await news.save();
  res.json(news);
});

app.put('/api/news/:id', upload.single('image'), async (req, res) => {
  const { title, excerpt, content, category, author, date } = req.body;
  let update = { title, excerpt, content, category, author, date };
  if (req.file) {
    update.image = `/uploads/${req.file.filename}`;
  }
  // If no file and no image in body, do not update image field (keep old)
  if (req.body.image) {
    update.image = req.body.image;
  }
  const news = await News.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true }
  );
  res.json(news);
});

app.delete('/api/news/:id', async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Notice routes
app.get('/api/notices', async (req, res) => {
  const notices = await Notice.find();
  console.log('GET /api/notices - Retrieved notices:', notices);
  res.json(notices);
});

app.post('/api/notices', upload.single('file'), async (req, res) => {
  try {
    console.log('POST /api/notices - Request body:', req.body);
    
    // If showPopup is true, unset it for all other notices
    if (req.body.showPopup === 'true') {
      await Notice.updateMany({}, { $set: { showPopup: false } });
    }
    
    const noticeData = {
      title: req.body.title,
      content: req.body.content,
      showPopup: req.body.showPopup === 'true',
      priority: req.body.priority || 'medium',
      category: req.body.category || 'General',
      isUrgent: req.body.isUrgent === 'true',
      updatedAt: new Date()
    };
    
    console.log('Notice data to be saved:', noticeData);
    
    if (req.file) {
      noticeData.file = `/uploads/${req.file.filename}`;
      // Determine file type based on extension
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        noticeData.fileType = 'image';
      } else if (ext === '.pdf') {
        noticeData.fileType = 'pdf';
      } else {
        noticeData.fileType = 'document';
      }
    } else {
      noticeData.fileType = 'none';
    }
    
    const notice = new Notice(noticeData);
    const savedNotice = await notice.save();
    console.log('Saved notice:', savedNotice);
    res.json(savedNotice);
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(500).json({ error: 'Failed to create notice' });
  }
});

app.put('/api/notices/:id', upload.single('file'), async (req, res) => {
  try {
    console.log('PUT /api/notices/:id - Request body:', req.body);
    
    // If showPopup is true, unset it for all other notices
    if (req.body.showPopup === 'true') {
      await Notice.updateMany({}, { $set: { showPopup: false } });
    }
    
    const updateData = {
      title: req.body.title,
      content: req.body.content,
      showPopup: req.body.showPopup === 'true',
      priority: req.body.priority || 'medium',
      category: req.body.category || 'General',
      isUrgent: req.body.isUrgent === 'true',
      updatedAt: new Date()
    };
    
    console.log('Update data:', updateData);
    
    if (req.file) {
      updateData.file = `/uploads/${req.file.filename}`;
      // Determine file type based on extension
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        updateData.fileType = 'image';
      } else if (ext === '.pdf') {
        updateData.fileType = 'pdf';
      } else {
        updateData.fileType = 'document';
      }
    }
    
    const notice = await Notice.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(notice);
  } catch (error) {
    console.error('Error updating notice:', error);
    res.status(500).json({ error: 'Failed to update notice' });
  }
});

app.delete('/api/notices/:id', async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting notice:', error);
    res.status(500).json({ error: 'Failed to delete notice' });
  }
});

// Gallery routes
// Gallery routes
app.get('/api/gallery', async (req, res) => {
  const events = await GalleryEvent.find();
  res.json(events);
});
app.post('/api/gallery', upload.array('images'), async (req, res) => {
  const { event } = req.body;
  const images = req.files ? req.files.map(f => '/uploads/' + f.filename) : [];
  const galleryEvent = new GalleryEvent({ event, images });
  await galleryEvent.save();
  res.json(galleryEvent);
});
app.put('/api/gallery/:id', upload.array('images'), async (req, res) => {
  const { event } = req.body;
  let images = [];
  if (req.files && req.files.length > 0) {
    images = req.files.map(f => '/uploads/' + f.filename);
  } else {
    // If no new images uploaded, keep existing images
    const existing = await GalleryEvent.findById(req.params.id);
    images = existing.images;
  }
  const updated = await GalleryEvent.findByIdAndUpdate(
    req.params.id,
    { event, images },
    { new: true }
  );
  res.json(updated);
});
app.delete('/api/gallery/:id', async (req, res) => {
  await GalleryEvent.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});


// --- Hero Schema and API ---
const heroSchema = new mongoose.Schema({
  image: String,
  title: String,
  subtitle: String,
  description: String,
  welcome: String // New field for welcome message
});
const Hero = mongoose.model('Hero', heroSchema);

// Get hero section (singleton)
app.get('/api/hero', async (req, res) => {
  let hero = await Hero.findOne();
  if (!hero) {
    // Create default if not exists
    hero = new Hero({
      image: '',
      title: 'Welcome to KEC',
      subtitle: '',
      description: '',
      welcome: ''
    });
    await hero.save();
  }
  res.json(hero);
});

// Update hero section (singleton)
app.put('/api/hero', upload.single('image'), async (req, res) => {
  let hero = await Hero.findOne();
  if (!hero) hero = new Hero();
  if (req.file) {
    hero.image = `/uploads/${req.file.filename}`;
  } else if (req.body.image !== undefined) {
    hero.image = req.body.image;
  }
  hero.title = req.body.title || '';
  hero.subtitle = req.body.subtitle || '';
  hero.description = req.body.description || '';
  hero.welcome = req.body.welcome || '';
  await hero.save();
  res.json(hero);
});

// --- Faculty Schema and API ---
const facultySchema = new mongoose.Schema({
  name: String,
  position: String,
  education: String,
  experience: String,
  specialties: [String],
  image: String,
  bio: String,
  featured: { type: Boolean, default: false },
});
const Faculty = mongoose.model('Faculty', facultySchema);

// Get all faculty
app.get('/api/faculty', async (req, res) => {
  const faculty = await Faculty.find().sort({ name: 1 });
  res.json(faculty);
});

// Add new faculty (with optional image upload)
app.post('/api/faculty', upload.single('image'), async (req, res) => {
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  const { name, position, education, experience, specialties, bio, featured } = req.body;
  const faculty = new Faculty({
    name,
    position,
    education,
    experience,
    specialties: specialties ? (typeof specialties === 'string' ? specialties.split(',').map(s => s.trim()) : specialties) : [],
    image: imageUrl,
    bio,
    featured: featured === 'true' || featured === true,
  });
  await faculty.save();
  res.json(faculty);
});

// Update faculty
app.put('/api/faculty/:id', upload.single('image'), async (req, res) => {
  let update = { ...req.body };
  if (req.file) {
    update.image = `/uploads/${req.file.filename}`;
  }
  if (update.specialties) {
    update.specialties = typeof update.specialties === 'string' ? update.specialties.split(',').map(s => s.trim()) : update.specialties;
  }
  update.featured = update.featured === 'true' || update.featured === true;
  const faculty = await Faculty.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(faculty);
});

// Delete faculty
app.delete('/api/faculty/:id', async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- Features Section Schema and API ---
const featuresSectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});
const FeaturesSection = mongoose.model('FeaturesSection', featuresSectionSchema);

// Get features section settings (singleton)
app.get('/api/features-section', async (req, res) => {
  let section = await FeaturesSection.findOne();
  if (!section) {
    section = new FeaturesSection({ title: '', description: '', image: '' });
    await section.save();
  }
  res.json(section);
});

// Update features section settings (singleton)
app.put('/api/features-section', upload.single('image'), async (req, res) => {
  let section = await FeaturesSection.findOne();
  if (!section) section = new FeaturesSection();
  if (req.file) {
    section.image = `/uploads/${req.file.filename}`;
  } else if (req.body.image !== undefined) {
    section.image = req.body.image;
  }
  section.title = req.body.title || '';
  section.description = req.body.description || '';
  await section.save();
  res.json(section);
});

// Delete features section image
app.delete('/api/features-section/image', async (req, res) => {
  let section = await FeaturesSection.findOne();
  if (section && section.image) {
    const filePath = path.join(__dirname, section.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    section.image = '';
    await section.save();
  }
  res.json({ success: true });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schoolcms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testimonialsRouter = require('./routes/testimonials');
app.use('/api/testimonials', testimonialsRouter);

const assignmentsRouter = require('./routes/assignments');
const notesRouter = require('./routes/notes');
const questionsRouter = require('./routes/questions');
const documentsRouter = require('./routes/documents');
app.use('/api/assignments', assignmentsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/documents', documentsRouter);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
