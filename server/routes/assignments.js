const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use the same uploads directory as main server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/assignments');
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
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for assignments
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and image files are allowed'));
    }
  }
});

// Get all assignments (for public website)
router.get('/', async (req, res) => {
  try {
    const currentDate = new Date();
    // Only return assignments that haven't expired
    const assignments = await Assignment.find({ 
      deadline: { $gte: currentDate } 
    }).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get assignments by class
router.get('/class/:className', async (req, res) => {
  try {
    const currentDate = new Date();
    const assignments = await Assignment.find({ 
      className: req.params.className,
      deadline: { $gte: currentDate }
    }).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all assignments for admin (including expired)
router.get('/admin', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new assignment (with file upload)
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, className, subject, deadline } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    let fileType = 'pdf';
    if (req.file.mimetype.startsWith('image/')) {
      fileType = 'image';
    }

    const assignment = new Assignment({
      title,
      description,
      className,
      subject,
      fileUrl: `/uploads/assignments/${req.file.filename}`,
      fileType,
      deadline: new Date(deadline)
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update assignment
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, description, className, subject, deadline } = req.body;
    let update = { title, description, className, subject, deadline: new Date(deadline) };
    
    if (req.file) {
      let fileType = 'pdf';
      if (req.file.mimetype.startsWith('image/')) {
        fileType = 'image';
      }
      update.fileUrl = `/uploads/assignments/${req.file.filename}`;
      update.fileType = fileType;
    }

    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete assignment
router.delete('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Optional: Delete the file from filesystem
    if (assignment.fileUrl) {
      const filePath = path.join(__dirname, '../', assignment.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clean up expired assignments (can be called manually or via cron job)
router.delete('/cleanup/expired', async (req, res) => {
  try {
    const currentDate = new Date();
    const expiredAssignments = await Assignment.find({ deadline: { $lt: currentDate } });
    
    // Delete files from filesystem
    for (const assignment of expiredAssignments) {
      if (assignment.fileUrl) {
        const filePath = path.join(__dirname, '../', assignment.fileUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
    
    // Delete from database
    const result = await Assignment.deleteMany({ deadline: { $lt: currentDate } });
    res.json({ 
      success: true, 
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} expired assignments cleaned up`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
