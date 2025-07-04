const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use the same uploads directory structure
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/notes');
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

// Get all notes (for public website)
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get notes by class
router.get('/class/:className', async (req, res) => {
  try {
    const notes = await Note.find({ className: req.params.className }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get notes by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const notes = await Note.find({ subject: req.params.subject }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all notes (for admin)
router.get('/admin', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new note
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const { title, description, className, subject } = req.body;
    
    if (!title || !className || !subject) {
      return res.status(400).json({ error: 'Title, class, and subject are required' });
    }

    // Determine file type
    let fileType = 'document';
    if (req.file.mimetype === 'application/pdf') {
      fileType = 'pdf';
    } else if (req.file.mimetype.startsWith('image/')) {
      fileType = 'image';
    }

    const note = new Note({
      title,
      description,
      className,
      subject,
      fileUrl: `/uploads/notes/${req.file.filename}`,
      fileType,
      uploadedBy: 'Admin'
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update note
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, description, className, subject } = req.body;
    const updateData = { title, description, className, subject, updatedAt: new Date() };

    if (req.file) {
      // Determine file type
      let fileType = 'document';
      if (req.file.mimetype === 'application/pdf') {
        fileType = 'pdf';
      } else if (req.file.mimetype.startsWith('image/')) {
        fileType = 'image';
      }

      updateData.fileUrl = `/uploads/notes/${req.file.filename}`;
      updateData.fileType = fileType;
    }

    const note = await Note.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Delete associated file
    if (note.fileUrl) {
      const filePath = path.join(__dirname, '../uploads/notes', path.basename(note.fileUrl));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
