import React, { useEffect, useState } from 'react';
import './Login_register.css';
import { Link, useNavigate } from 'react-router-dom';
import checkAuth from '../../utils/checkAuth';

const SignUp = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    user_address: '',
    user_number: '',
  });

  const { user_name, user_email, user_password, user_address, user_number } =
    inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      if (
        user_name &&
        user_email &&
        user_password &&
        user_address &&
        user_number
      ) {
        const body = {
          user_name,
          user_email,
          user_password,
          user_address,
          user_number,
        };
        const response = await fetch(
          'http://localhost:5000/api/v1/auth/register',
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
        }
      } else {
        alert('please fill all the inputs');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const isAuthorized = checkAuth();
    isAuthorized.then((res) => {
      if (res === true) navigate('/');
    });
  }, []);

  return (
    <>
      <div className="form_container">
        <form className="form" onSubmit={register}>
          <p className="form-title">Sign Up</p>

          <div className="input-container">
            <input
              type="text"
              name="user_name"
              placeholder="name"
              value={user_name}
              onChange={(e) => onChange(e)}
            />
          </div>

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

          <div className="input-container">
            <input
              type="text"
              name="user_address"
              placeholder="address"
              value={user_address}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              name="user_number"
              placeholder="Phone"
              value={user_number}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type="submit" className="submit">
            Sign in
          </button>

          <p className="signup-link">
            Already have account?
            <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
