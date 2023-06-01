import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileimage from '../../images/programming icon.png';
import './Profile.css';
import EditProfile from './EditProfile';
import checkAuth from '../../utils/checkAuth';
import { getUserData } from '../../utils/data';
import checkAdmin from '../../utils/checkAdmin';

const Profile = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const LoggedIn = checkAuth();
    LoggedIn.then((res) => {
      setIsLoggedIn(res);
    });

    const admin = checkAdmin();
    admin.then((res) => {
      setIsAdmin(res);
    });
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      const data = getUserData(user_id);
      data.then((res) => {
        setUserData(res);
      });
    } else navigate('/login');
  }, [showEditForm]);

  const logout = () => {
    console.log('ok');
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  return (
    <>
      {isLoggedIn && !showEditForm && (
        <div className="profile-container">
          <div className="card">
            <div className="top-container">
              <img
                src={profileimage}
                alt=""
                className="img-fluid profile-image"
                width="70"
              />
              <div className="ml-3">
                <h5 className="name">{userData.user_name}</h5>
                <p className="mail">{userData.user_email}</p>
              </div>
            </div>

            <div className="middle-container d-flex justify-content-between align-items-center mt-3 p-2">
              <div className="dollar-div px-3"></div>
              <div className="d-flex flex-column text-right mr-2">
                <span className="current-balance">phone number: </span>
                <span className="amount">
                  <span className="dollar-sign"></span>81081882
                </span>
              </div>
            </div>

            <div className="btn_container">
              <button
                onClick={() => setShowEditForm(true)}
                className="edit_btn"
              >
                Edit
              </button>
              <button onClick={() => logout()} className="logout_btn">
                Logout
              </button>
            </div>

            {isAdmin && (
              <div className="admin">
                <Link className="admin_link" to="/adminPanel">
                  <span>Admin Panel</span>
                  <i className="fa-solid fa-lock"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {showEditForm && (
        <EditProfile userData={userData} closeEditForm={closeEditForm} />
      )}
    </>
  );
};

export default Profile;
