import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addAnnouncement, addJobPost, addStudyMaterial, addResult,
    announcements, jobPosts, studyMaterials, results } = useData();

  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    announcement: { title: '', content: '' },
    jobPost: { title: '', company: '', description: '', deadline: '' },
    studyMaterial: { title: '', description: '', department: '', fileName: '' },
    result: { studentName: '', rollNumber: '', department: '', subject: '', marks: '', status: 'Pass' },
  });

  const courses = ['M.C.A', 'M.Sc', 'Ph.D'];

  const handleInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmitAnnouncement = (e) => {
    e.preventDefault();
    if (formData.announcement.title && formData.announcement.content && user) {
      addAnnouncement({
        title: formData.announcement.title,
        content: formData.announcement.content,
        author: user.name,
        department: user.department,
      });
      setFormData(prev => ({ ...prev, announcement: { title: '', content: '' } }));
      alert('Announcement posted successfully!');
    }
  };

  const handleSubmitJobPost = (e) => {
    e.preventDefault();
    const { title, company, description, deadline } = formData.jobPost;
    if (title && company && description && deadline && user) {
      addJobPost({ title, company, description, deadline, author: user.name });
      setFormData(prev => ({ ...prev, jobPost: { title: '', company: '', description: '', deadline: '' } }));
      alert('Job post created successfully!');
    }
  };

  const handleSubmitStudyMaterial = (e) => {
    e.preventDefault();
    const { title, description, department, fileName } = formData.studyMaterial;
    if (title && description && department && user) {
      addStudyMaterial({
        title,
        description,
        department,
        fileName: fileName || 'document.pdf',
        uploadedBy: user.name,
      });
      setFormData(prev => ({ ...prev, studyMaterial: { title: '', description: '', department: '', fileName: '' } }));
      alert('Study material uploaded successfully!');
    }
  };

  const handleSubmitResult = (e) => {
    e.preventDefault();
    const { studentName, rollNumber, department, subject, marks, status } = formData.result;
    if (studentName && rollNumber && department && subject && marks && user) {
      addResult({
        studentName, rollNumber, department, subject,
        marks: parseInt(marks),
        status,
        postedBy: user.name,
      });
      setFormData(prev => ({
        ...prev,
        result: { studentName: '', rollNumber: '', department: '', subject: '', marks: '', status: 'Pass' },
      }));
      alert('Result posted successfully!');
    }
  };

  const myAnnouncements = announcements.filter(a => a.author === user?.name);
  const myJobPosts = jobPosts.filter(j => j.author === user?.name);
  const myMaterials = studyMaterials.filter(m => m.uploadedBy === user?.name);
  const myResults = results.filter(r => r.postedBy === user?.name);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'announcements', label: 'Post Announcement' },
    { id: 'jobs', label: 'Add Job Post' },
    { id: 'materials', label: 'Upload Materials' },
    { id: 'results', label: 'Post Results' },
  ];

  return (
    <div className="min-vh-100 bg-light">
      <div className="bg-white border-bottom shadow-sm py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 className="h3 fw-bold text-success mb-0">Staff Dashboard</h1>
              <p className="text-muted mb-0 small">Welcome back, {user?.name} 👋</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <div className="fw-semibold">{user?.name}</div>
                  <div className="text-muted small">{user?.department} · Staff</div>
                </div>
              </div>
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm"> Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <ul className="nav nav-pills bg-white shadow-sm rounded-3 p-2 mb-4 flex-wrap gap-1">
          {tabs.map(tab => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? 'active bg-success' : 'text-secondary'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {activeTab === 'overview' && (
          <>
            <div className="row g-4 mb-4">
              {[
                { count: myAnnouncements.length, label: 'My Announcements', color: 'primary' },
                { count: myJobPosts.length, label: 'Job Posts', color: 'warning' },
                { count: myMaterials.length, label: 'Study Materials', color: 'secondary' },
                { count: myResults.length, label: 'Results Posted',  color: 'success' },
              ].map((stat, i) => (
                <div className="col-6 col-md-3" key={i}>
                  <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <div className={`h3 fw-bold text-${stat.color} mb-0`}>{stat.count}</div>
                        <div className="text-muted small">{stat.label}</div>
                      </div>
                      <span style={{ fontSize: 32 }}>{stat.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-4">⚡ Quick Actions</h5>
                    <div className="row g-3">
                      {[
                        { tab: 'announcements', label: 'Post Announcement', color: 'primary' },
                        { tab: 'jobs',  label: 'Add Job Post', color: 'warning' },
                        { tab: 'materials',  label: 'Upload Material', color: 'secondary' },
                        { tab: 'results',  label: 'Post Results', color: 'success' },
                      ].map(action => (
                        <div className="col-6" key={action.tab}>
                          <button
                            onClick={() => setActiveTab(action.tab)}
                            className={`btn btn-outline-${action.color} w-100 py-3 d-flex flex-column align-items-center gap-2`}
                          >
                            <span style={{ fontSize: 28 }}>{action.icon}</span>
                            <span className="small fw-medium">{action.label}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3"> Recent Activity</h5>
                    {myAnnouncements.length === 0 ? (
                      <p className="text-muted text-center py-4 small">No recent activity</p>
                    ) : (
                      <ul className="list-group list-group-flush">
                        {myAnnouncements.slice(0, 3).map(a => (
                          <li key={a.id} className="list-group-item px-0 border-0 border-bottom py-2">
                            <div className="d-flex gap-2 align-items-start">
                              <span></span>
                              <div>
                                <div className="small fw-medium">{a.title}</div>
                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                                  {new Date(a.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'announcements' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0">Post New Announcement</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmitAnnouncement}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Announcement Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter announcement title"
                    required
                    value={formData.announcement.title}
                    onChange={(e) => handleInputChange('announcement', 'title', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Content</label>
                  <textarea
                    className="form-control"
                    rows={6}
                    placeholder="Enter announcement content"
                    required
                    value={formData.announcement.content}
                    onChange={(e) => handleInputChange('announcement', 'content', e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary px-4 py-2"> Post Announcement </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0">Add Job Posting</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmitJobPost}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Software Engineer"
                      required
                      value={formData.jobPost.title}
                      onChange={(e) => handleInputChange('jobPost', 'title', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company name"
                      required
                      value={formData.jobPost.company}
                      onChange={(e) => handleInputChange('jobPost', 'company', e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Application Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={formData.jobPost.deadline}
                    onChange={(e) => handleInputChange('jobPost', 'deadline', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Job Description</label>
                  <textarea
                    className="form-control"
                    rows={6}
                    placeholder="Enter job description, requirements, etc."
                    required
                    value={formData.jobPost.description}
                    onChange={(e) => handleInputChange('jobPost', 'description', e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-warning px-4 py-2 fw-semibold"> Post Job  </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0"> Upload Study Material</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmitStudyMaterial}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Material Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Chapter 5 - Data Structures"
                      required
                      value={formData.studyMaterial.title}
                      onChange={(e) => handleInputChange('studyMaterial', 'title', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Course</label>
                    <select
                      className="form-select"
                      required
                      value={formData.studyMaterial.department}
                      onChange={(e) => handleInputChange('studyMaterial', 'department', e.target.value)}
                    >
                      <option value="">-- Select Course --</option>
                      {courses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Brief description of the material"
                    required
                    value={formData.studyMaterial.description}
                    onChange={(e) => handleInputChange('studyMaterial', 'description', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">File Name (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., data_structures_ch5.pdf"
                    value={formData.studyMaterial.fileName}
                    onChange={(e) => handleInputChange('studyMaterial', 'fileName', e.target.value)}
                  />
                  <div className="form-text">In a real app, you would upload the actual file here.</div>
                </div>
                <button type="submit" className="btn btn-secondary px-4 py-2 fw-semibold"> Upload Material   </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0"> Post Student Result</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmitResult}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Student Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter student name"
                      required
                      value={formData.result.studentName}
                      onChange={(e) => handleInputChange('result', 'studentName', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Roll Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter roll number"
                      required
                      value={formData.result.rollNumber}
                      onChange={(e) => handleInputChange('result', 'rollNumber', e.target.value)}
                    />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Course</label>
                    <select
                      className="form-select"
                      required
                      value={formData.result.department}
                      onChange={(e) => handleInputChange('result', 'department', e.target.value)}
                    >
                      <option value="">-- Select Course --</option>
                      {courses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Data Structures"
                      required
                      value={formData.result.subject}
                      onChange={(e) => handleInputChange('result', 'subject', e.target.value)}
                    />
                  </div>
                </div>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Marks (0–100)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter marks"
                      min="0"
                      max="100"
                      required
                      value={formData.result.marks}
                      onChange={(e) => handleInputChange('result', 'marks', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                      className="form-select"
                      required
                      value={formData.result.status}
                      onChange={(e) => handleInputChange('result', 'status', e.target.value)}
                    >
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-success px-4 py-2 fw-semibold"> Post Result </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
