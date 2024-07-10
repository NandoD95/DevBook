import React from "react";
import "./Style/about.css";

// about info on home page
const About = () => {
  return (
    <div className="about">
      <h2>About</h2>
      <p>
        Welcome to DevBook: Where Developers Thrive!
        <br /><br />
        At DevBook, we're not just building a platform; we're fostering a community of innovation where developers and engineers can connect, collaborate, and create like never before. Imagine a space where sharing insights, discussing breakthroughs, and showcasing projects isn't just encouraged—it's celebrated.
        <br /><br />
        With DevBook, you can:
        <ul>
          <li>Post and Share Insights: Whether it's a thought-provoking idea or a technical tutorial, your voice matters. Share your knowledge and learn from others in our vibrant community.</li>
          <li>Showcase Projects: From coding challenges to full-scale applications, highlight your creations with detailed project pages. Get feedback, iterate, and watch your projects evolve.</li>
          <li>Favorite Projects: Discover inspiring projects from fellow developers and engineers. Bookmark your favorites and curate your personalized "Favorite Page" for quick access and inspiration.</li>
          <li>Profile Customization: Your profile is your digital identity. Update your skills, showcase your achievements, and connect with like-minded professionals. It's your space to shine.</li>
        </ul>
        Join DevBook today and be part of a revolution in developer collaboration. Together, let's build the future of technology, one line of code at a time. Start sharing, start connecting, and let your creativity soar with DevBook!
      </p>
    </div>
  );
}

export default About;
