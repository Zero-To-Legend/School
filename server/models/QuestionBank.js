const mongoose = require('mongoose');

const QuestionBankSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  className: { type: String, required: true },
  subject: { type: String, required: true },
  examType: { type: String, required: true }, // e.g., 'Final Exam', 'Mid Term', 'Quiz', 'Practice Test'
  year: { type: Number, required: true }, // e.g., 2023, 2024
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'image', 'document'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  uploadedBy: { type: String, default: 'Admin' }
});

// Update the updatedAt field before saving
QuestionBankSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('QuestionBank', QuestionBankSchema);
