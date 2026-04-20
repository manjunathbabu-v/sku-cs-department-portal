import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const AboutUs = () => {

  return (
    <div className="bg-light">

      <div className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold">About Us</h1>
        <p>School of Computer Science & Technology</p>
      </div>

      <div className="container py-5">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h3>Our Vision</h3>
            <p>
              To foster academic excellence and innovation in Computer Science.
            </p>

            <h3 className="mt-4">Our Mission</h3>
            <ul>
              <li>Deliver quality technical education</li>
              <li>Encourage research and projects</li>
              <li>Promote collaboration</li>
              <li>Build leadership skills</li>
            </ul>
          </div>

          <div className="col-md-6">
            <img
              src="/slider1.jpg"
              alt="dept"
              className="img-fluid rounded shadow"
            />
          </div>

        </div>
      </div>

      <div className="bg-white py-5">
        <div className="container text-center">
          <h3 className="mb-4">What Makes Us Different?</h3>

          <div className="row g-4">
            {[
              {  title: "Industry Curriculum" },
              {  title: "Expert Faculty" },
              {  title: "Modern Labs" },
              {  title: "Startup Support" },
              {  title: "Career Support" },
              {  title: "Research Focus" },
            ].map((f, i) => (
              <div key={i} className="col-md-4">
                <div className="card p-4 shadow-sm h-100">
                  <div style={{ fontSize: 30 }}>{f.icon}</div>
                  <h5 className="mt-3">{f.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;