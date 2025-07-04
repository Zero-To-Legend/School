const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');
const testimonialsRouter = require('../routes/testimonials');

const app = express();
app.use(express.json());
app.use('/api/testimonials', testimonialsRouter);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/testimonials_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Testimonials API', () => {
  let id;
  it('should create a testimonial', async () => {
    const res = await request(app)
      .post('/api/testimonials')
      .send({
        quote: 'Test quote',
        name: 'Test Name',
        designation: 'Test Designation',
        image: ''
      });
    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();
    id = res.body._id;
  });

  it('should fetch testimonials', async () => {
    const res = await request(app).get('/api/testimonials');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a testimonial', async () => {
    const res = await request(app)
      .put(`/api/testimonials/${id}`)
      .send({
        quote: 'Updated quote',
        name: 'Test Name',
        designation: 'Test Designation',
        image: ''
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.quote).toBe('Updated quote');
  });

  it('should delete a testimonial', async () => {
    const res = await request(app).delete(`/api/testimonials/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
