import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';

type Testimonial = {
  _id?: string;
  quote: string;
  name: string;
  designation: string;
  image?: string;
};

const TestimonialsCMS = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Testimonial>({ quote: '', name: '', designation: '', image: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = () => {
    setLoading(true);
    fetch(`${API_BASE}/testimonials`)
      .then(res => res.json())
      .then(setTestimonials)
      .catch(() => setError('Failed to load testimonials'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchTestimonials, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE}/testimonials/${editingId}` : `${API_BASE}/testimonials`;
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save testimonial');
        return res.json();
      })
      .then(() => {
        fetchTestimonials();
        setForm({ quote: '', name: '', designation: '', image: '' });
        setEditingId(null);
      })
      .catch(() => setError('Failed to save testimonial'))
      .finally(() => setLoading(false));
  };

  const handleEdit = (t: Testimonial) => {
    setForm(t);
    setEditingId(t._id || null);
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/testimonials/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete testimonial');
        fetchTestimonials();
      })
      .catch(() => setError('Failed to delete testimonial'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Student Testimonials</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <textarea name="quote" value={form.quote} onChange={handleChange} placeholder="Quote" className="w-full border p-2 rounded" required />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
        <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" className="w-full border p-2 rounded" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
        <button className="kec-btn" type="submit" disabled={loading}>{editingId ? 'Update' : 'Add'} Testimonial</button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
      {loading && <div>Loading...</div>}
      <ul>
        {testimonials.map(t => (
          <li key={t._id} className="mb-4 p-4 border rounded flex items-center">
            <img
              src={
                t.image
                  ? t.image.startsWith('http')
                    ? t.image
                    : `${API_BASE.replace(/\/api$/, '')}${t.image}`
                  : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.name || 'Student')
              }
              alt={t.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
              onError={e => {
                (e.currentTarget as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.name || 'Student');
              }}
            />
            <div className="flex-1">
              <div className="font-bold">{t.name}</div>
              <div className="text-sm text-gray-600">{t.designation}</div>
              <div className="italic">{t.quote}</div>
            </div>
            <button onClick={() => handleEdit(t)} className="text-blue-600 ml-2">Edit</button>
            <button onClick={() => handleDelete(t._id!)} className="text-red-600 ml-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TestimonialsCMS;
