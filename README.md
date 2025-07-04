# School Management System

A modern, responsive school management system built with React, TypeScript, Node.js, and MongoDB.

## 🌟 Features

### Frontend
- **Modern React UI** with TypeScript
- **Responsive Design** with Tailwind CSS
- **Multi-page Application** with React Router
- **Dynamic Content Management**
- **File Upload & Management**
- **Notice Popup System**
- **Interactive Gallery**
- **Faculty Management**

### Backend
- **Node.js & Express** REST API
- **MongoDB** database with Mongoose
- **File Upload** with Multer
- **CORS** enabled for cross-origin requests
- **Comprehensive Data Models**

### Pages & Features
- 🏠 **Home** - Dynamic hero with rotating subtitles
- 📚 **Academics** - Academic programs and curriculum
- 👥 **Faculty** - Faculty profiles and departments
- 📢 **Notice** - Important announcements with popup system
- 📰 **News** - Latest school news and updates
- 🎓 **Admissions** - Admission process and requirements
- 📖 **eLibrary** - Digital resources (Notes, Assignments, Question Banks)
- 🖼️ **Gallery** - School events and photo galleries
- 📞 **Contact** - Contact information and location
- 📊 **Results** - Academic results and achievements
- ⚙️ **Admin Panel** - Content management system

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **React Quill** for rich text editing

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Multer** for file uploads
- **CORS** for cross-origin requests

## 📁 Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── api.js             # API configuration
│   └── main.tsx           # App entry point
├── server/                # Backend source code
│   ├── models/            # MongoDB models
│   ├── uploads/           # File upload directory
│   └── index.js           # Server entry point
├── public/                # Static assets
└── dist/                  # Build output (ignored)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/school-management-system.git
   cd school-management-system
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/school_management
   PORT=5001
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

6. **Run the application**
   
   **Option 1: Use the provided batch files (Windows)**
   ```bash
   # Start both frontend and backend
   start-all.bat
   
   # Or start server only
   start-server.bat
   ```
   
   **Option 2: Manual start**
   ```bash
   # Terminal 1 - Start backend
   cd server
   npm start
   
   # Terminal 2 - Start frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 📖 Usage

### Admin Panel
Access the admin panel at `/secret` to manage:
- Homepage content and hero section
- Faculty profiles
- News articles
- Notices with popup functionality
- School logo and branding
- Gallery events and images

### Content Management
- **Hero Section**: Update welcome message, title, and rotating subtitles
- **Faculty**: Add/edit faculty profiles with images and specialties
- **News**: Create and manage news articles with rich text editor
- **Notices**: Post important announcements with file attachments
- **Gallery**: Upload and organize event photos

## 🎨 Design System

### Color Palette
- **Navy Blue** (#1e3a8a) - Primary text and headers
- **Orange** (#ea580c) - Accent colors and highlights  
- **Cream** (#fef3c7) - Backgrounds and subtle elements
- **White** (#ffffff) - Content backgrounds

### Features
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Glass morphism and gradient effects
- **Smooth Animations** - Transitions and hover effects
- **Accessibility** - Proper contrast and keyboard navigation

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+) 
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🔧 API Endpoints

### Frontend Routes
- `/` - Home page
- `/academics` - Academic programs
- `/faculty` - Faculty profiles
- `/notice` - Notice board
- `/news` - News articles
- `/admissions` - Admission information
- `/elibrary` - Digital library
- `/gallery` - Photo gallery
- `/contact` - Contact information
- `/results` - Academic results
- `/secret` - Admin panel

### Backend API
- `GET/POST /api/hero` - Homepage hero content
- `GET/POST /api/faculty` - Faculty management
- `GET/POST /api/news` - News articles
- `GET/POST /api/notices` - Notice management
- `GET/POST /api/gallery` - Gallery events
- `GET/POST /api/logo` - School logo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database solution
- Vite for the fast build tooling
- All contributors who helped make this project better

## 📞 Support

If you have any questions or need help, please:
1. Check the existing issues
2. Create a new issue with detailed description
3. Contact the development team

---

**Built with ❤️ for educational institutions**
