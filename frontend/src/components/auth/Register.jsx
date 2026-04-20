import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    course: '',
    rollNumber: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const courses = ['M.C.A.', 'M.Sc. (Computer Science)', 'Ph.D.'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.role === 'student' && !formData.rollNumber) {
      setError('Roll number is required for students');
      return;
    }

    setLoading(true);
    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase(),        // Backend expects "STUDENT" / "STAFF"
        department: formData.course,
        rollNumber: formData.role === 'student' ? formData.rollNumber : undefined,
      });

      if (success) {
        navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      } else {
        setError('Registration failed. User may already exist.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="w-100" style={{ maxWidth: '480px' }}>
        <div className="card shadow-lg border-0 rounded-4 p-4">
          {/* Header */}
          <div className="text-center mb-4">
            <Link to="/">
              <img src="/logo.png" alt="Logo" height="56" width="56" className="mb-3" />
            </Link>
            <h2 className="fw-bold">Create Account</h2>
            <p className="text-muted small">
              Already have an account?{' '}
              <Link to="/login" className="text-primary fw-medium">Sign in here</Link>
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="mb-3">
              <label className="form-label fw-medium">I am a</label>
              <div className="d-flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                  className={`btn flex-fill ${formData.role === 'student' ? 'btn-primary' : 'btn-outline-secondary'}`}
                >
                   Student
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'staff' }))}
                  className={`btn flex-fill ${formData.role === 'staff' ? 'btn-primary' : 'btn-outline-secondary'}`}
                >
                  Staff
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-medium">Full Name</label>
              <div className="input-group">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">Email Address</label>
              <div className="input-group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="course" className="form-label fw-medium">Select Course</label>
              <div className="input-group">
                <select
                  id="course"
                  name="course"
                  className="form-select"
                  required
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option value="">-- Select Course --</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
            </div>

            {formData.role === 'student' && (
              <div className="mb-3">
                <label htmlFor="rollNumber" className="form-label fw-medium">Roll Number</label>
                <div className="input-group">
                  <input
                    id="rollNumber"
                    name="rollNumber"
                    type="text"
                    className="form-control"
                    placeholder="Enter your roll number"
                    required
                    value={formData.rollNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-medium">Password</label>
              <div className="input-group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Create a password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label fw-medium">Confirm Password</label>
              <div className="input-group">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100 py-2 fw-semibold"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Creating Account...
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/" className="text-muted small">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
