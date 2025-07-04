import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';

type Faculty = {
  _id?: string;
  name: string;
  position: string;
  education?: string;
  experience?: string;
  specialties?: string[];
  image?: string;
  bio?: string;
  featured?: boolean;
};

const AboutFaculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/faculty`)
      .then(res => res.json())
      .then(data => {
        setFaculty(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-keccream min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kecblue mb-4">Our Faculty</h2>
          <p className="text-xl text-kecblue/70 max-w-3xl mx-auto">
            Meet the dedicated educators who inspire and guide our students every day.
          </p>
        </div>
        {loading ? (
          <div className="text-center text-kecblue/50 py-12">Loading faculty...</div>
        ) : faculty.length === 0 ? (
          <div className="text-center text-kecblue/50 py-12">No faculty members found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faculty.map((member, index) => {
              let imageUrl = member.image || '';
              if (imageUrl && !/^https?:\/\//.test(imageUrl)) {
                const base = API_BASE.replace(/\/api$/, '');
                imageUrl = `${base}${imageUrl}`;
              }
              return (
                <div key={member._id || index} className="bg-white/90 rounded-2xl shadow-xl overflow-hidden border border-kecblue/10">
                  <img
                    src={imageUrl || 'https://placehold.co/400x400?text=No+Image'}
                    alt={member.name}
                    className="w-full h-64 object-cover bg-kecblue/10"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/400x400?text=No+Image'; }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-kecblue mb-1">{member.name}</h3>
                    <p className="text-kecorange font-medium mb-3">{member.position}</p>
                    <p className="text-kecblue/70">{member.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutFaculty;
