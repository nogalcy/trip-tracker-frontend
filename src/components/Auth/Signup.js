import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import { registerUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = { name, email, password };
      const result = await registerUser(userData);
      if (result.user) {
        navigate('/map');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Registration Failed. Please try again.");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="card-container">
        <div className="card border border-light-subtle rounded-3 shadow-sm">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="text-center mb-3">
              <a href="#!">
                <img src={logo} alt="Logo" />
              </a>
            </div>
            <h2 className="fs-6 fw-normal text-center text-light mb-4 " style={{ marginTop: '30px' }}>Enter your details to register</h2>
            <form onSubmit={handleSubmit}>
              {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
              )}
              <div className="row gy-2 overflow-hidden">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control bg-dark text-light"
                      name="name"
                      id="name"
                      placeholder="Name"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name" className="form-label text-light">Name</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control bg-dark text-light"
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email" className="form-label text-light">Email</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control bg-dark text-light"
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password" className="form-label text-light">Password</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid my-3">
                    <button className="btn btn-primary btn-lg" type="submit">Sign up</button>
                  </div>
                </div>
                <div className="col-12">
                  <p className="m-0 text-light text-center">
                    Already have an account? <Link to='/login' className="link-light text-decoration-none">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
