/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        kecblue: {
          DEFAULT: '#0F2C6D', // main dark blue
          light: '#203C83',   // lighter blue
        },
        kecorange: '#FFA330', // accent orange
        keccream: '#FFF6E9',  // cream background
        kecblack: '#111111',
        kecwhite: '#FFFFFF',
        // New Gallery color scheme
        galleryforest: '#1B4332', // Forest Green
        gallerylight: '#87CEEB', // Light Blue
        gallerycream: '#F5F5DC', // Cream
        // New Navbar color scheme
        navblue: '#002B5B', // Navy Blue
        navorange: '#FF8C00', // Orange
        // New Hero color scheme (Warm Contrast)
        herocream: '#FEF7ED', // Cream
        heroorange: '#FED7AA', // Light Orange
      },
      fontFamily: {
        heading: ['Montserrat', 'Arial', 'sans-serif'],
        body: ['Inter', 'Arial', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'subtitle-slide': 'subtitleSlide 0.7s ease-in-out',
        'subtitle-enter': 'subtitleEnter 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'progress-continuous': 'progressBarContinuous 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        subtitleSlide: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '50%': { transform: 'translateY(-5px)', opacity: '0.5' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        subtitleEnter: {
          '0%': { transform: 'translateY(30px) scale(0.8)', opacity: '0' },
          '60%': { transform: 'translateY(-5px) scale(1.02)', opacity: '0.8' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        progressBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        progressBarContinuous: {
          '0%': { width: '0%', opacity: '0.8' },
          '90%': { width: '100%', opacity: '1' },
          '100%': { width: '100%', opacity: '0.3' },
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'orange': '0 10px 25px -5px rgba(249, 115, 22, 0.25)',
      },
    },
  },
  plugins: [],
};
