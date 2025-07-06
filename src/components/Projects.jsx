import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const projectData = [
    {
      title: "Scribble AI",
      description: "An AI-powered drawing app that allows users to iterate on their rough sketches and create new artworks.",
      videoSrc: "/assets/project1.mp4", // Video source for the first project
      link: "#"
    },
    {
      title: "DoodleVerse",
      description: "A real-time 3D drawing game that allows users to draw on a shared canvas. Built with React Three Fiber and Socket.IO.",
      videoSrc: "/assets/project1.mp4", // Video source for the first project
      link: "#"
    }
    // You can add more projects here...
  ]; 

  return (
    <section id="project" className="projects-section">
      <div className="projects-header">
        <h2>#project</h2>
        <a href="#all-tags" className="all-tags-link">All Tags ↗</a>
      </div>
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="video-container">
              <video autoPlay loop muted playsInline>
                <source src={project.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} className="read-more">Continue Reading ↗</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
