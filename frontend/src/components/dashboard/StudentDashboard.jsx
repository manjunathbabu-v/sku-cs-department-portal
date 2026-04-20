import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { announcements, studyMaterials, results, jobPosts, addComment } = useData();

  const [activeTab, setActiveTab] = useState('overview');
  const [commentText, setCommentText] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);

  const studentResults = results.filter(
    r => r.rollNumber === user?.rollNumber && r.department === user?.department
  );
  const departmentMaterials = studyMaterials.filter(
    m => m.department === user?.department
  );

  const passedResults = studentResults.filter(r => r.status === 'Pass');
  const averageMarks = studentResults.length > 0
    ? Math.round(studentResults.reduce((sum, r) => sum + r.marks, 0) / studentResults.length)
    : 0;
  const successRate = studentResults.length > 0
    ? Math.round((passedResults.length / studentResults.length) * 100)
    : 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddComment = (jobPostId) => {
    if (commentText.trim() && user) {
      addComment(jobPostId, { author: user.name, content: commentText });
      setCommentText('');
      setSelectedJobId(null);
    }
  };

  const getGrade = (marks) => {
    if (marks >= 90) return { label: 'A+', color: 'warning' };
    if (marks >= 80) return { label: 'A', color: 'success' };
    if (marks >= 70) return { label: 'B', color: 'primary' };
    if (marks >= 60) return { label: 'C', color: 'info' };
    return { label: 'F', color: 'danger' };
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'results', label: 'Results' },
    { id: 'materials', label: 'Study Materials' },
    { id: 'jobs', label: 'Job Posts' },
  ];

  return (
    <div className="min-vh-100 bg-light">
      <div className="bg-white border-bottom shadow-sm py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 className="h3 fw-bold text-primary mb-0">Student Dashboard</h1>
              <p className="text-muted mb-0 small">Welcome back, {user?.name} </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <div className="fw-semibold">{user?.name}</div>
                  <div className="text-muted small">{user?.department} · Roll: {user?.rollNumber}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm"> Logout   </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {/* Tabs */}
        <ul className="nav nav-pills bg-white shadow-sm rounded-3 p-2 mb-4 flex-wrap gap-1">
          {tabs.map(tab => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? 'active' : 'text-secondary'}`}
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
                { count: announcements.length, label: 'Announcements', color: 'primary' },
                { count: studentResults.length, label: 'Results', color: 'success' },
                { count: departmentMaterials.length, label: 'Study Materials',  color: 'purple' },
                { count: jobPosts.length, label: 'Job Posts', color: 'warning' },
              ].map((stat, i) => (
                <div className="col-6 col-md-3" key={i}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <div className={`h3 fw-bold text-${stat.color === 'purple' ? 'secondary' : stat.color} mb-0`}>
                          {stat.count}
                        </div>
                        <div className="text-muted small">{stat.label}</div>
                      </div>
                      <span style={{ fontSize: 32 }}>{stat.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-4"> Academic Performance</h5>
                    <div className="row g-3 text-center">
                      <div className="col-4">
                        <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                          <div className="h4 fw-bold text-primary">{averageMarks}%</div>
                          <div className="small text-muted">Average Score</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="bg-success bg-opacity-10 rounded-3 p-3">
                          <div className="h4 fw-bold text-success">{passedResults.length}</div>
                          <div className="small text-muted">Subjects Passed</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="bg-info bg-opacity-10 rounded-3 p-3">
                          <div className="h4 fw-bold text-info">{successRate}%</div>
                          <div className="small text-muted">Success Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3"> Recent Activity</h5>
                    {announcements.length === 0 ? (
                      <p className="text-muted small text-center py-3">No recent activity</p>
                    ) : (
                      <ul className="list-group list-group-flush">
                        {announcements.slice(0, 3).map(a => (
                          <li key={a.id} className="list-group-item px-0 border-0 border-bottom py-2">
                            <div className="d-flex gap-2 align-items-start">
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
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="fw-bold mb-0">Latest Announcements</h5>
            </div>
            <div className="card-body">
              {announcements.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <div style={{ fontSize: 48 }}></div>
                  <p className="mt-2">No announcements available</p>
                </div>
              ) : (
                announcements.map(a => (
                  <div key={a.id} className="border rounded-3 p-4 mb-3 hover-shadow">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="fw-bold mb-0">{a.title}</h6>
                      <span className="badge bg-light text-muted border small">
                        📅 {new Date(a.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-secondary mb-3">{a.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-primary fw-medium">By: {a.author}</small>
                      <span className="badge bg-primary bg-opacity-10 text-primary">{a.department}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ─── Results Tab ──────────────────────────────────────────── */}
        {activeTab === 'results' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="fw-bold mb-0">Your Academic Results</h5>
            </div>
            <div className="card-body p-0">
              {studentResults.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <div style={{ fontSize: 48 }}></div>
                  <p className="mt-2">No results available yet</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Status</th>
                        <th>Grade</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentResults.map(r => {
                        const grade = getGrade(r.marks);
                        return (
                          <tr key={r.id}>
                            <td className="fw-medium">📄 {r.subject}</td>
                            <td>
                              <span className="fw-bold h5 mb-0">{r.marks}</span>
                              <span className="text-muted">/100</span>
                            </td>
                            <td>
                              <span className={`badge bg-${r.status === 'Pass' ? 'success' : 'danger'}`}>
                                {r.status}
                              </span>
                            </td>
                            <td>
                              <span className={`badge bg-${grade.color} text-dark`}>
                                {grade.label}
                              </span>
                            </td>
                            <td className="text-muted small">
                              {new Date(r.date).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="fw-bold mb-0">📚 Study Materials — {user?.department}</h5>
            </div>
            <div className="card-body">
              {departmentMaterials.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <div style={{ fontSize: 48 }}>📚</div>
                  <p className="mt-2">No study materials available for your department</p>
                </div>
              ) : (
                departmentMaterials.map(m => (
                  <div key={m.id} className="border rounded-3 p-4 mb-3 d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span style={{ fontSize: 22 }}>📄</span>
                        <h6 className="fw-bold mb-0">{m.title}</h6>
                      </div>
                      <p className="text-muted small mb-2">{m.description}</p>
                      <div className="d-flex gap-3 text-muted" style={{ fontSize: '0.8rem' }}>
                        <span> {m.uploadedBy}</span>
                        <span> {new Date(m.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <a
                      href={m.fileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm flex-shrink-0"
                    >
                      View
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="fw-bold mb-0"> Job Opportunities</h5>
            </div>
            <div className="card-body">
              {jobPosts.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <div style={{ fontSize: 48 }}></div>
                  <p className="mt-2">No job posts available</p>
                </div>
              ) : (
                jobPosts.map(job => (
                  <div key={job.id} className="border rounded-3 p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="fw-bold mb-1">{job.title}</h5>
                        <div className="text-primary fw-semibold">{job.company}</div>
                      </div>
                      <span style={{ fontSize: 32 }}></span>
                    </div>
                    <p className="text-muted mb-3">{job.description}</p>
                    <div className="d-flex gap-3 mb-4 flex-wrap" style={{ fontSize: '0.85rem' }}>
                      <span className="badge bg-danger bg-opacity-10 text-danger border border-danger-subtle px-3 py-2">
                         Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                      <span className="text-muted"> Posted by: {job.author}</span>
                    </div>

                    {/* Comments */}
                    <div className="border-top pt-3">
                      <h6 className="fw-bold mb-3"> Comments ({job.comments.length})</h6>
                      {job.comments.map(comment => (
                        <div key={comment.id} className="bg-light rounded-3 p-3 mb-2">
                          <div className="d-flex justify-content-between mb-1">
                            <span className="fw-semibold small">{comment.author}</span>
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                              {new Date(comment.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="mb-0 small">{comment.content}</p>
                        </div>
                      ))}

                      {selectedJobId === job.id ? (
                        <div className="mt-3">
                          <textarea
                          value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write your comment..."
                            className="form-control mb-2"
                            rows={3}
                          />
                          <div className="d-flex gap-2">
                            <button onClick={() => handleAddComment(job.id)} className="btn btn-primary btn-sm"> Post Comment </button>
                            <button
                              onClick={() => { setSelectedJobId(null); setCommentText(''); }}
                              className="btn btn-outline-secondary btn-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedJobId(job.id)}
                          className="btn btn-link btn-sm text-primary p-0 mt-2"
                        >
                          💬 Add Comment
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
