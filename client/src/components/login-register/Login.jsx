import React, { useState } from 'react';
import './Login_register.css';
import { Link } from 'react-router-dom';
// import Loading from '../loading/Loading'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [inputs, setInputs] = useState({
    user_email: '',
    user_password: '',
  });

  const { user_email, user_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      if (user_email && user_password) {
        const body = { user_email, user_password };
        const response = await fetch(
          'http://localhost:5000/api/v1/auth/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }
        );

        const parseRes = await response.json();
        if (parseRes.token) {
          localStorage.setItem('token', parseRes.token);
          localStorage.setItem('user_id', parseRes.user_id);
          navigate('/');
        } else {
          setInputs({ ...inputs, user_email: '', user_password: '' });
          alert('Invalid email/password combination');
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="form_container">
        <form className="form" onSubmit={signIn}>
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input
              type="email"
              name="user_email"
              placeholder="email"
              value={user_email}
              onChange={(e) => onChange(e)}
            />
            <span></span>
          </div>

          <div className="input-container">
            <input
              type="password"
              name="user_password"
              placeholder="password"
              value={user_password}
              onChange={(e) => onChange(e)}
            />
          </div>

          <button type="submit" className="submit">
            Sign in
          </button>

          <p className="signup-link">
            No account?
            <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
