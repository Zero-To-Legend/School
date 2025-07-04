const express = require('express');
const router = express.Router();
const QuestionBank = require('../models/QuestionBank');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use the same uploads directory structure
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/questions');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
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
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, image, and document files are allowed'));
    }
  }
});

// Get all questions (for public website)
router.get('/', async (req, res) => {
  try {
    const questions = await QuestionBank.find().sort({ year: -1, createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions by class
router.get('/class/:className', async (req, res) => {
  try {
    const questions = await QuestionBank.find({ className: req.params.className }).sort({ year: -1, createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const questions = await QuestionBank.find({ subject: req.params.subject }).sort({ year: -1, createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all questions (for admin)
router.get('/admin', async (req, res) => {
  try {
    const questions = await QuestionBank.find().sort({ year: -1, createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new question
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const { title, description, className, subject, examType, year } = req.body;
    
    if (!title || !className || !subject || !examType || !year) {
      return res.status(400).json({ error: 'Title, class, subject, exam type, and year are required' });
    }

    // Determine file type
    let fileType = 'document';
    if (req.file.mimetype === 'application/pdf') {
      fileType = 'pdf';
    } else if (req.file.mimetype.startsWith('image/')) {
      fileType = 'image';
    }

    const question = new QuestionBank({
      title,
      description,
      className,
      subject,
      examType,
      year: parseInt(year),
      fileUrl: `/uploads/questions/${req.file.filename}`,
      fileType,
      uploadedBy: 'Admin'
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update question
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, description, className, subject, examType, year } = req.body;
    const updateData = { 
      title, 
      description, 
      className, 
      subject, 
      examType, 
      year: parseInt(year), 
      updatedAt: new Date() 
    };

    if (req.file) {
      // Determine file type
      let fileType = 'document';
      if (req.file.mimetype === 'application/pdf') {
        fileType = 'pdf';
      } else if (req.file.mimetype.startsWith('image/')) {
        fileType = 'image';
      }

      updateData.fileUrl = `/uploads/questions/${req.file.filename}`;
      updateData.fileType = fileType;
    }

    const question = await QuestionBank.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete question
router.delete('/:id', async (req, res) => {
  try {
    const question = await QuestionBank.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Delete associated file
    if (question.fileUrl) {
      const filePath = path.join(__dirname, '../uploads/questions', path.basename(question.fileUrl));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
