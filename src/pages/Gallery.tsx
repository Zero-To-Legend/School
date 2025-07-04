import { useEffect, useState } from 'react';
import { X, ZoomIn, Download, Calendar, Filter, Grid, List, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE } from '../api';

type GalleryEvent = {
  _id?: string;
  event: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
};

const Gallery = () => {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/gallery`)
      .then(res => res.json())
      .then(data => {
        let galleryEvents: GalleryEvent[] = [];
        
        // Handle different possible response formats
        if (Array.isArray(data)) {
          galleryEvents = data;
        } else if (data.events && Array.isArray(data.events)) {
          galleryEvents = data.events;
        } else if (data.gallery && Array.isArray(data.gallery)) {
          galleryEvents = data.gallery;
        }
        
        // Sort by creation date (newest first)
        galleryEvents.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.updatedAt || '').getTime();
          const dateB = new Date(b.createdAt || b.updatedAt || '').getTime();
          return dateB - dateA; // Newest first
        });
        
        setEvents(galleryEvents);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter events based on search and selected event
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = selectedEvent === 'all' || event.event === selectedEvent;
    return matchesSearch && matchesEvent;
  });

  // Open lightbox
  const openLightbox = (imageSrc: string, eventImages: string[], imageIndex: number) => {
    setSelectedImage(imageSrc);
    setCurrentEventImages(eventImages);
    setSelectedImageIndex(imageIndex);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentEventImages([]);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  // Navigate lightbox
  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (selectedImageIndex - 1 + currentEventImages.length) % currentEventImages.length
      : (selectedImageIndex + 1) % currentEventImages.length;
    
    setSelectedImageIndex(newIndex);
    const newImage = currentEventImages[newIndex];
    const src = newImage.startsWith('http') ? newImage : `${API_BASE.replace(/\/api$/, '')}${newImage}`;
    setSelectedImage(src);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
        if (e.key === 'ArrowRight') navigateLightbox('next');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, selectedImageIndex, currentEventImages]);

  // Download image
  const downloadImage = (src: string, eventName: string, index: number) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${eventName}-${index + 1}.jpg`;
    link.click();
  };

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-gallerycream to-gallerylight/20 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-galleryforest/10 via-gallerylight/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-gallerylight/10 via-galleryforest/5 to-transparent rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-gallerycream/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-galleryforest to-gallerylight rounded-full flex items-center justify-center shadow-2xl">
              <Grid className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-galleryforest via-gallerylight to-galleryforest mb-6 tracking-tight">
            Gallery
          </h1>
          <p className="text-xl md:text-2xl text-galleryforest/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Explore moments from our vibrant campus life, academic events, and student activities
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-12 bg-white shadow-2xl rounded-3xl p-8 border border-gallerycream">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-galleryforest/60 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-galleryforest/20 focus:border-gallerylight focus:ring-2 focus:ring-gallerylight/20 focus:outline-none transition-all duration-300 bg-gallerycream/50"
              />
            </div>

            {/* Event Filter */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-galleryforest to-gallerylight rounded-full flex items-center justify-center">
                <Filter className="text-white h-4 w-4" />
              </div>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="px-6 py-4 rounded-2xl border-2 border-galleryforest/20 focus:border-gallerylight focus:ring-2 focus:ring-gallerylight/20 focus:outline-none transition-all duration-300 bg-gallerycream/50 text-galleryforest font-medium"
              >
                <option value="all">All Events</option>
                {events.map(event => (
                  <option key={event._id} value={event.event}>{event.event}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gallerycream rounded-2xl p-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-galleryforest to-gallerylight text-white shadow-lg' 
                    : 'text-galleryforest/60 hover:text-galleryforest hover:bg-white/50'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'masonry' 
                    ? 'bg-gradient-to-r from-galleryforest to-gallerylight text-white shadow-lg' 
                    : 'text-galleryforest/60 hover:text-galleryforest hover:bg-white/50'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Gallery Content */}
        <div className="space-y-20">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg animate-pulse border border-gallerycream">
                  <div className="h-64 bg-gradient-to-br from-gallerycream to-gallerylight/20 rounded-t-3xl"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gallerycream to-gallerylight/20 rounded-full w-3/4"></div>
                    <div className="h-3 bg-gradient-to-r from-gallerycream to-gallerylight/20 rounded-full w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-galleryforest to-gallerylight rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <Search className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-galleryforest mb-2">No Events Found</h3>
              <p className="text-galleryforest/60">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filteredEvents.map((event, i) => (
              <div key={event._id || i} className="group">
                {/* Event Header */}
                <div className="flex items-center justify-between mb-8 bg-white shadow-xl rounded-3xl p-8 border border-gallerycream hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="w-2 h-16 bg-gradient-to-b from-galleryforest to-gallerylight rounded-full shadow-lg"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-galleryforest group-hover:text-gallerylight transition-colors duration-300">
                        {event.event}
                      </h2>
                      <p className="text-galleryforest/60 mt-2 font-medium">{event.images.length} photos</p>
                    </div>
                  </div>
                  {event.createdAt && (
                    <div className="flex items-center gap-3 text-sm text-galleryforest bg-gallerycream px-6 py-3 rounded-2xl border border-gallerylight/20">
                      <div className="w-6 h-6 bg-gradient-to-br from-galleryforest to-gallerylight rounded-full flex items-center justify-center">
                        <Calendar className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-medium">
                        {new Date(event.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Images Grid */}
                <div className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {event.images.map((img, idx) => {
                    const src = img.startsWith('http') ? img : `${API_BASE.replace(/\/api$/, '')}${img}`;
                    return (
                      <div 
                        key={idx} 
                        className="group/image relative overflow-hidden rounded-3xl shadow-xl bg-white border border-gallerycream hover:border-gallerylight transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
                        onClick={() => openLightbox(src, event.images, idx)}
                        style={{
                          gridRowEnd: viewMode === 'masonry' ? `span ${Math.ceil(Math.random() * 2) + 1}` : 'auto'
                        }}
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={src}
                            alt={`${event.event} image ${idx + 1}`}
                            className={`w-full object-cover transition-transform duration-500 group-hover/image:scale-110 ${
                              viewMode === 'grid' ? 'h-64' : 'h-auto'
                            }`}
                            loading="lazy"
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-galleryforest/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                              <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                {idx + 1} of {event.images.length}
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    downloadImage(src, event.event, idx);
                                  }}
                                  className="p-2 bg-gallerylight/90 backdrop-blur-sm rounded-full hover:bg-galleryforest transition-all duration-300 shadow-lg"
                                >
                                  <Download className="h-4 w-4 text-white" />
                                </button>
                                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                                  <ZoomIn className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-galleryforest/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-gallerylight hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-lg"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation buttons */}
              {currentEventImages.length > 1 && (
                <>
                  <button
                    onClick={() => navigateLightbox('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-gallerylight hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => navigateLightbox('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-gallerylight hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={selectedImage}
                alt="Gallery image"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/20"
              />

              {/* Image counter */}
              {currentEventImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-galleryforest to-gallerylight text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                  {selectedImageIndex + 1} of {currentEventImages.length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
