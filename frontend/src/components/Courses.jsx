import React from 'react';

const coursesData = [
  {
    title: 'M.C.A. - Master of Computer Applications',
    description: 'A comprehensive postgraduate program focused on software development, database systems, and enterprise applications.',
    duration: '4 Semesters',
    intake: '30 Candidates',
    eligibility: 'Based on ICET Rank',
    highlights: [
      'Focus on programming, data structures, and full-stack development',
      'Industry projects and internships included',
      'Strong placement support',
    ],
  },
  {
    title: 'M.Sc. Computer Science',
    description: 'A postgraduate science program focusing on theoretical computer science, algorithms, and system-level programming.',
    duration: '4 Semesters',
    intake: '30 Candidates',
    eligibility: 'Based on SKUCET Rank',
    highlights: [
      'Advanced topics in computing and data science',
      'Research opportunities and academic training',
      'Access to state-of-the-art labs',
    ],
  },
  {
    title: 'Ph.D. in Computer Science',
    description: 'Doctoral research program in advanced computer science disciplines including AI, ML, and Networks.',
    duration: 'Minimum 3 Years',
    intake: 'Based on Supervisor Availability',
    eligibility: 'As per University Research Guidelines',
    highlights: [
      'Independent research with faculty mentorship',
      'Publishing in journals and conferences',
      'Scholarship and fellowship opportunities',
    ],
  },
];

const Courses = () => {
  return (
    <div className="bg-light min-vh-100">
      <div className="py-5 text-white text-center" style={{ background: 'linear-gradient(135deg, #1d4ed8, #4338ca)' }}>
        <div className="container">
          <h1 className="display-5 fw-bold mb-2">Post Graduate Courses</h1>
          <p className="lead opacity-90">
            Presently, the Department of Computer Science and Applications is offering the following Post Graduate Courses.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {coursesData.map((course, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 p-4">

                <div className="d-flex align-items-center gap-3 mb-3">
                  <h5 className="fw-bold mb-0">{course.title}</h5>
                </div>

                <p className="text-muted small mb-3">{course.description}</p>

                <div className="mb-3">
                  <p className="mb-1 small">
                    <span className="text-primary fw-semibold"> Duration:</span> {course.duration}
                  </p>
                  <p className="mb-1 small">
                    <span className="text-primary fw-semibold"> Intake:</span> {course.intake}
                  </p>
                  <p className="mb-1 small">
                    <span className="text-primary fw-semibold"> Eligibility:</span> {course.eligibility}
                  </p>
                </div>

                <div className="border-top pt-3 mt-auto">
                  <h6 className="fw-semibold mb-2">Program Highlights:</h6>
                  <ul className="list-group list-group-flush">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="list-group-item border-0 px-0 py-1 small text-secondary">
                         {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
