const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true }, // e.g., 'Forms', 'Policies', 'Announcements', 'Guidelines'
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'image', 'document'], required: true },
  isPublic: { type: Boolean, default: true }, // Whether visible to all users
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  uploadedBy: { type: String, default: 'Admin' }
});

// Update the updatedAt field before saving
DocumentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Document', DocumentSchema);
