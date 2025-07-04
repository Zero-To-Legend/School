const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use the same uploads directory structure
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/documents');
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

// Get all public documents (for public website)
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get documents by category
router.get('/category/:category', async (req, res) => {
  try {
    const documents = await Document.find({ 
      category: req.params.category, 
      isPublic: true 
    }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all documents (for admin)
router.get('/admin', async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new document
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const { title, description, category, isPublic } = req.body;
    
    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required' });
    }

    // Determine file type
    let fileType = 'document';
    if (req.file.mimetype === 'application/pdf') {
      fileType = 'pdf';
    } else if (req.file.mimetype.startsWith('image/')) {
      fileType = 'image';
    }

    const document = new Document({
      title,
      description,
      category,
      isPublic: isPublic === 'true' || isPublic === true,
      fileUrl: `/uploads/documents/${req.file.filename}`,
      fileType,
      uploadedBy: 'Admin'
    });

    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update document
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, description, category, isPublic } = req.body;
    const updateData = { 
      title, 
      description, 
      category, 
      isPublic: isPublic === 'true' || isPublic === true,
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

      updateData.fileUrl = `/uploads/documents/${req.file.filename}`;
      updateData.fileType = fileType;
    }

    const document = await Document.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete document
router.delete('/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Delete associated file
    if (document.fileUrl) {
      const filePath = path.join(__dirname, '../uploads/documents', path.basename(document.fileUrl));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
