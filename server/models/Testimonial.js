const mongoose = require('mongoose');
const TestimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  image: { type: String }, // URL or path
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Testimonial', TestimonialSchema);
