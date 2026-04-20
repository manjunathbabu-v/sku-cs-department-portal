import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    { url: '/slider1.jpg', title: 'Excellence in Education', subtitle: "Shaping tomorrow's leaders through innovative learning" },
    { url: '/slider2.jpeg', title: 'Campus', subtitle: 'State-of-the-art facilities for comprehensive learning' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="position-relative overflow-hidden" style={{ height: '100vh' }}>
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease',
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ background: 'rgba(0,0,0,0.45)' }}
            >
              <div className="text-center text-white px-3">
                <h1 className="display-3 fw-bold mb-3">{image.title}</h1>
                <p className="lead mb-4 opacity-90">{image.subtitle}</p>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <Link to="/register" className="btn btn-light btn-lg px-4 fw-semibold text-primary">
                    Get Started →
                  </Link>
                  <a href="#features" className="btn btn-outline-light btn-lg px-4 fw-semibold">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setCurrentSlide(p => (p - 1 + carouselImages.length) % carouselImages.length)}
          className="btn btn-light btn-sm position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle opacity-75"
          style={{ width: 44, height: 44 }}
        >❮</button>
        <button
          onClick={() => setCurrentSlide(p => (p + 1) % carouselImages.length)}
          className="btn btn-light btn-sm position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle opacity-75"
          style={{ width: 44, height: 44 }}
        >❯</button>

        {/* Indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="btn p-0 rounded-circle border-0"
              style={{
                width: 12, height: 12,
                background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>
      </div>

      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Courses Offered</h2>
            <p className="text-muted lead">
              Presently the Department of Computer Science and Applications is offering the following Post Graduate Courses:
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            <CourseCard
              iconColor="text-primary"
              title="Master of Computer Applications (M.C.A.)"
              intake="30 candidates"
              duration="4 Semesters"
              description="A comprehensive course equipping students with modern software development and IT skills."
            />
            <CourseCard
              iconColor="text-success"
              title="M.Sc (Computer Science)"
              intake="30 candidates"
              duration="4 Semesters"
              description="Advanced coursework in core CS topics and preparation for research or professional careers."
            />
            <CourseCard
              iconColor="text-secondary"
              title="Ph.D. in Computer Science"
              intake="Rolling (as per university notifications)"
              duration="Flexible"
              description="Research-focused doctoral program contributing to scholarly advancement in computing."
            />
          </div>

          <div className="mt-5">
            <h4 className="fw-bold">Admission Info</h4>
            <p className="text-secondary">
              Candidates for admission into M.C.A and M.Sc (Computer Science) are selected from the qualified list of candidates
              in <strong>ICET</strong> and <strong>SKUCET</strong> following the rules of the State Government.
            </p>
            <h5 className="fw-bold mt-4">Areas of Specialisation</h5>
            <ul className="text-secondary">
              <li><strong>P.G. Level</strong></li>
              <li><strong>Ph.D Level</strong></li>
              <li><strong>Individual Teachers Level</strong></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Why Choose Our Department?</h2>
            <p className="text-muted lead">
              Our portal connects students and faculty with learning, job, and academic resources.
            </p>
          </div>
          <div className="row g-4">
            <FeatureCard  title="Study Materials" description="Access organized learning resources across all subjects." />
            <FeatureCard  title="Results & Grades" description="View marks and progress instantly in your dashboard." />
            <FeatureCard  title="Job Opportunities" description="Explore campus recruitment and internships easily." />
            <FeatureCard  title="Announcements" description="Stay informed about updates, events, and alerts." />
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">SKU Computer Science &amp; Technology</h5>
              <p className="text-secondary">Empowering future tech leaders through innovation and academic excellence.</p>
            </div>
            <div className="col-md-4">
              <h6 className="fw-semibold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                {[['About Us', '/about-us'], ['Faculty', '/faculty'], ['Courses', '/courses'], ['Gallery', '/gallery']].map(([label, href]) => (
                  <li key={href} className="mb-1">
                    <Link to={href} className="text-secondary text-decoration-none">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="fw-semibold mb-3">Contact Info</h6>
              <ul className="list-unstyled text-secondary">
                <li className="mb-2">📍 Andhra Pradesh, India</li>
                <li className="mb-2">📞 +91 99999 99999</li>
                <li className="mb-2">📧 skucst@gmail.com</li>
              </ul>
            </div>
          </div>
          <hr className="border-secondary mt-4" />
          <p className="text-center text-secondary mb-0 small">
            &copy; {new Date().getFullYear()} SKU Computer Science &amp; Technology. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="col-md-3 col-sm-6">
    <div className="card border-0 shadow-sm h-100 text-center p-3 hover-shadow">
      <div className="display-4 mb-3">{icon}</div>
      <h5 className="fw-bold">{title}</h5>
      <p className="text-muted small">{description}</p>
    </div>
  </div>
);

const CourseCard = ({ icon, iconColor, title, intake, duration, description }) => (
  <div className="col-md-4">
    <div className="card border-0 shadow-sm h-100 p-3">
      <div className="d-flex align-items-center gap-3 mb-3">
        <span className={`display-5 ${iconColor}`}>{icon}</span>
        <h5 className="fw-semibold mb-0">{title}</h5>
      </div>
      <p className="text-muted small mb-2">{description}</p>
      <p className="small text-primary fw-medium mb-1"> Duration: {duration}</p>
      <p className="small text-primary fw-medium"> Intake: {intake}</p>
    </div>
  </div>
);

export default LandingPage;
