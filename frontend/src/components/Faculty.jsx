import React from 'react';

const facultyData = [
  {
    name: "Dr. J. Keziya Rani",
    role: "Assistant Professor",
    bio: "Expert in Software Engineering with over 20 years of teaching experience.",
    phone: "+91-9876543210",
    email: "keziya@sku.edu.in",
    img: "/J. keziya rani madam.jpeg"
  },
  {
    name: "Dr. B. Satyanarayana",
    role: "Professor",
    bio: "Specializes in Algorithms and Distributed Systems.",
    phone: "+91-9876543212",
    email: "satya@sku.edu.in",
    img: "/B.Satyanaryana sir.jpeg"
  },
  {
    name: "Dr. V. Raghunatha Reddy",
    role: "Professor",
    bio: "Focuses on Data Mining and Machine Learning. Published 15+ research papers.",
    phone: "+91-9876543211",
    email: "raghunatha@sku.edu.in",
    office: "Room 102",
    img: "/V.Raghunatha Reddy sir.jpeg"
  },
  {
    name: "Dr. P. Devaraju",
    role: "Assistant Professor",
    bio: "Researcher in Cybersecurity and Network Analysis.",
    phone: "+91-9876543213",
    email: "devaraju@sku.edu.in",
    office: "Room 104",
    img: "/P.Devaraju sir.jpeg"
  },
  {
    name: "Dr. N. Geethanjali",
    role: "Professor",
    bio: "Specializes in Artificial Intelligence and Deep Learning.",
    phone: "+91-9876543214",
    email: "geethanjali@sku.edu.in",
    office: "Room 105",
    img: "/N. Geethanjali madam.jpeg"
  },
  {
    name: "Dr. T. Bhaskara Reddy",
    role: "Assistant Professor",
    bio: "Teaches Database Systems and Cloud Computing.",
    phone: "+91-9876543215",
    email: "bhaskara@sku.edu.in",
    office: "Room 106",
    img: "/T. Bhaskara Reddy sir.jpeg"
  }
];

const Faculty = () => {
  return (
    <div className="bg-light min-vh-100">
      <div className="py-5 text-white text-center" style={{ background: 'linear-gradient(135deg, #1d4ed8, #4338ca)' }}>
        <div className="container">
          <h1 className="display-5 fw-bold mb-2">Our Esteemed Faculty</h1>
          <p className="lead opacity-90">
            Meet the experienced and dedicated professors who inspire and guide our students.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {facultyData.map((faculty, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 text-center p-4">
                <img
                  src={faculty.img}
                  alt={faculty.name}
                  className="rounded-circle mx-auto mb-3 border border-3 border-primary object-fit-cover"
                  style={{ width: 128, height: 128 }}
                  onError={e => { e.target.src = '/logo.png'; }}
                />
                <h5 className="fw-bold mb-1">{faculty.name}</h5>
                <p className="text-primary fw-semibold small mb-2">{faculty.role}</p>
                <p className="text-muted small mb-3">{faculty.bio}</p>

                <div className="border-top pt-3 mt-auto">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-2 small text-secondary">
                    <span>📞</span> {faculty.phone}
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-2 small text-secondary">
                    <span>@</span> {faculty.email}
                  </div>
                  {faculty.office && (
                    <div className="d-flex align-items-center justify-content-center gap-2 small text-secondary">
                      <span>📍</span> Office: {faculty.office}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faculty;