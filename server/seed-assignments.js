const mongoose = require('mongoose');
const Assignment = require('./models/Assignment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/school-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Sample assignments for testing
const sampleAssignments = [
  {
    title: "Mathematics Assignment - Algebra",
    description: "Complete exercises on linear equations and quadratic functions. Show all work and include graphs where applicable.",
    className: "Grade 9",
    subject: "Mathematics",
    fileUrl: "/uploads/assignments/sample-math-assignment.pdf",
    fileType: "pdf",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    uploadedBy: "Admin"
  },
  {
    title: "Science Project - Solar System",
    description: "Create a detailed model of the solar system with explanations of each planet's characteristics.",
    className: "Grade 8",
    subject: "Science",
    fileUrl: "/uploads/assignments/sample-science-project.pdf",
    fileType: "pdf",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    uploadedBy: "Admin"
  },
  {
    title: "English Literature Essay",
    description: "Write a 1000-word essay on the themes of friendship and loyalty in 'Of Mice and Men'.",
    className: "Grade 10",
    subject: "English",
    fileUrl: "/uploads/assignments/sample-english-essay.pdf",
    fileType: "pdf",
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    uploadedBy: "Admin"
  },
  {
    title: "History Research Assignment",
    description: "Research and present on the causes and effects of World War II on your assigned country.",
    className: "Grade 11",
    subject: "History",
    fileUrl: "/uploads/assignments/sample-history-research.pdf",
    fileType: "pdf",
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    uploadedBy: "Admin"
  },
  {
    title: "Chemistry Lab Report",
    description: "Complete the acid-base titration experiment and submit a detailed lab report with calculations.",
    className: "Grade 12",
    subject: "Chemistry",
    fileUrl: "/uploads/assignments/sample-chemistry-lab.pdf",
    fileType: "pdf",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now (urgent)
    uploadedBy: "Admin"
  }
];

async function seedAssignments() {
  try {
    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('Cleared existing assignments');
    
    // Insert sample assignments
    await Assignment.insertMany(sampleAssignments);
    console.log('Sample assignments inserted successfully');
    
    // Show inserted assignments
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    console.log('\nInserted assignments:');
    assignments.forEach((assignment, index) => {
      console.log(`${index + 1}. ${assignment.title} - ${assignment.className} - ${assignment.subject}`);
      console.log(`   Deadline: ${assignment.deadline.toDateString()}`);
    });
    
    console.log('\nSample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding assignments:', error);
    process.exit(1);
  }
}

seedAssignments();
