const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001/api';

async function testAssignmentsAPI() {
  try {
    console.log('Testing Assignments API...\n');
    
    // Test 1: Get all assignments
    console.log('1. Getting all assignments...');
    const response = await fetch(`${API_BASE}/assignments`);
    const assignments = await response.json();
    console.log(`Found ${assignments.length} assignments`);
    
    if (assignments.length > 0) {
      console.log('Sample assignment:', {
        title: assignments[0].title,
        className: assignments[0].className,
        subject: assignments[0].subject,
        deadline: assignments[0].deadline
      });
    }
    
    // Test 2: Get assignments by class
    console.log('\n2. Getting assignments for Grade 9...');
    const gradeResponse = await fetch(`${API_BASE}/assignments/class/Grade 9`);
    const gradeAssignments = await gradeResponse.json();
    console.log(`Found ${gradeAssignments.length} assignments for Grade 9`);
    
    console.log('\nAPI tests completed successfully!');
    
  } catch (error) {
    console.error('Error testing API:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\nServer is not running. Please start the server first:');
      console.log('cd server && node index.js');
    }
  }
}

testAssignmentsAPI();
