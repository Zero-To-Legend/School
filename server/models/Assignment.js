const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  className: { type: String, required: true }, // e.g., "Grade 9", "Class 10A", etc.
  subject: { type: String, required: true },
  fileUrl: { type: String, required: true }, // PDF or image file
  fileType: { type: String, enum: ['pdf', 'image'], required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  uploadedBy: { type: String, default: 'Admin' }
});

// Index for automatic cleanup of expired assignments
AssignmentSchema.index({ deadline: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Assignment', AssignmentSchema);
