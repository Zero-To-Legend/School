import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';

type Event = {
  _id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/events`).then(res => res.json()).then(setEvents).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (events.length === 0) return <div>No upcoming events.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event, index) => (
        <div key={event._id || index} className="bg-white/90 p-6 rounded-2xl shadow-xl border-l-4 border-kecorange">
          <div className="text-kecorange font-bold text-sm mb-2">{event.date}</div>
          <h3 className="font-semibold text-kecblue mb-2">{event.title}</h3>
          <div className="text-sm text-kecblue/70">
            <div className="mb-1">{event.time}</div>
            <div>{event.location}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
