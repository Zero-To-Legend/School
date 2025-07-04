const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  className: { type: String, required: true },
  subject: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'image', 'document'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  uploadedBy: { type: String, default: 'Admin' }
});

// Update the updatedAt field before saving
NoteSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Note', NoteSchema);
