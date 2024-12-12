import React, { useState } from 'react';
import './Learninghub.css'; // Import the corresponding CSS file

// LearningHub Component
function LearningHub() {
  // Mock data for featured courses
  const [featuredCourses] = useState([
    { id: 1, title: 'Web Development Basics', instructor: 'John Doe', price: 50, description: 'Learn the fundamentals of web development from scratch.' },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', price: 100, description: 'Master JavaScript with in-depth lessons and exercises.' },
    { id: 3, title: 'Digital Marketing Essentials', instructor: 'Michael Johnson', price: 70, description: 'Unlock the strategies and tools of digital marketing.' }
  ]);

  // Handler for course purchase (mock)
  const handlePurchase = (course) => {
    alert(`Course Purchased: ${course.title} for $${course.price}`);
    // Implement your payment logic here
  };

  return (
    <section className="learninghub-container" id="learninghub">
      <header className="learninghub-header">
        <h1>Welcome to LearningHub</h1>
        <p>Empower your learning journey with Enky Solutions</p>
      </header>

      {/* Features Section */}
      <section className="learninghub-features">
        <div className="feature-box">
          <h3>Expert-Led Courses</h3>
          <p>Learn from industry professionals with years of experience.</p>
        </div>
        <div className="feature-box">
          <h3>Interactive Learning</h3>
          <p>Engage with other learners and get real-time feedback.</p>
        </div>
        <div className="feature-box">
          <h3>Certificates</h3>
          <p>Earn certificates upon course completion to showcase your skills.</p>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="courses-grid">
          {featuredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p>{course.description}</p>
              <p><strong>Price:</strong> ${course.price}</p>
              <button className="purchase-button" onClick={() => handlePurchase(course)}>Enroll Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Section (for logged-in users) */}
      <section className="learninghub-dashboard">
        <h2>Your Dashboard</h2>
        <p>Manage your enrolled courses and track your progress.</p>
        <div className="dashboard-courses">
          {/* Placeholder for enrolled courses */}
          <div className="dashboard-card">
            <h3>Web Development Basics</h3>
            <p>Status: In Progress</p>
            <button className="view-course-button">Continue</button>
          </div>
          <div className="dashboard-card">
            <h3>Advanced JavaScript</h3>
            <p>Status: Not Started</p>
            <button className="view-course-button">Start Course</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default LearningHub;
