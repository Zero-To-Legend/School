import React from 'react';
import { Target, Eye, Heart, Award, Users, Globe } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for the highest standards in everything we do, encouraging students to reach their full potential.'
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We foster honesty, respect, and ethical behavior as the foundation of character development.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We build strong relationships and create an inclusive environment where everyone belongs.'
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'We prepare students to be responsible global citizens in an interconnected world.'
  }
];

const timeline = [
  { year: '1965', event: 'Founded as a small private school with 50 students' },
  { year: '1980', event: 'Expanded to include middle school program' },
  { year: '1995', event: 'Added high school and became K-12 institution' },
  { year: '2005', event: 'Launched International Baccalaureate program' },
  { year: '2015', event: 'Opened new STEM center and innovation lab' },
  { year: '2020', event: 'Implemented hybrid learning model' },
  { year: '2024', event: 'Celebrating 59 years of educational excellence' }
];

const AboutSchool = () => (
  <div>
    {/* Hero Section */}
    <section className="relative py-20 bg-gradient-to-r from-kecblue to-kecorange text-kecwhite">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg)'
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Excellence Academy</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          For nearly six decades, we have been committed to providing exceptional education 
          that nurtures the whole child and prepares students for lifelong success.
        </p>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-kecblue/10 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-kecblue mr-3" />
              <h2 className="text-2xl font-bold text-kecblue">Our Mission</h2>
            </div>
            <p className="text-kecblue text-lg leading-relaxed">
              To inspire and empower students to become confident, creative, and compassionate 
              leaders who make meaningful contributions to their communities and the world. 
              We provide a rigorous, innovative education that develops critical thinking, 
              character, and a lifelong love of learning.
            </p>
          </div>

          <div className="bg-kecorange/10 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Eye className="h-8 w-8 text-kecorange mr-3" />
              <h2 className="text-2xl font-bold text-kecorange">Our Vision</h2>
            </div>
            <p className="text-kecorange text-lg leading-relaxed">
              To be the premier educational institution that sets the standard for academic 
              excellence, innovation, and character development. We envision a school community 
              where every student thrives, discovers their passion, and develops the skills 
              and values needed to succeed in a rapidly changing world.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="py-20 bg-keccream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kecblue mb-4">Our Core Values</h2>
          <p className="text-xl text-kecblue/70 max-w-3xl mx-auto">
            These fundamental principles guide everything we do and shape the character 
            of our school community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white/90 p-6 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-shadow duration-300 border border-kecblue/10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-kecorange/10 rounded-full mb-4">
                <value.icon className="h-8 w-8 text-kecorange" />
              </div>
              <h3 className="text-xl font-semibold text-kecblue mb-3">{value.title}</h3>
              <p className="text-kecblue/70">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* History Timeline */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kecblue mb-4">Our History</h2>
          <p className="text-xl text-kecblue/70 max-w-3xl mx-auto">
            A journey of growth, innovation, and educational excellence spanning nearly six decades.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-kecorange/40"></div>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex items-center">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-kecorange rounded-full border-4 border-white shadow-md"></div>
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'} md:w-1/2`}>
                  <div className="bg-white/90 p-6 rounded-2xl shadow-xl border border-kecblue/10">
                    <div className="text-2xl font-bold text-kecorange mb-2">{item.year}</div>
                    <p className="text-kecblue">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default AboutSchool;
