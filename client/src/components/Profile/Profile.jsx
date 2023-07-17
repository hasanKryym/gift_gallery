import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import EditProfile from './EditProfile';
import checkAuth from '../../utils/checkAuth';
import { getUserData } from '../../utils/data';
import checkAdmin from '../../utils/checkAdmin';
import { FaSearchDollar } from 'react-icons/fa';
import { AiOutlineArrowLeft, AiFillHeart } from 'react-icons/ai';

const Profile = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const LoggedIn = checkAuth();
    LoggedIn.then((res) => {
      setIsLoggedIn(res);
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
        <>
          <div className="profile-container">
            <div className="card">
              <AiOutlineArrowLeft
                className="home_arrow"
                onClick={() => navigate('/')}
              />
              <div className="top-container">
                <div className="ml-3">
                  <h5 className="name">{userData.user_name}</h5>
                  <p className="mail">{userData.user_email}</p>
                </div>
                <div
                  className="transactions_icon"
                  onClick={() => navigate('transactions')}
                >
                  <FaSearchDollar />
                </div>
              </div>

              <div className="middle-container d-flex justify-content-between align-items-center mt-3 p-2">
                <div className="dollar-div px-3"></div>
                <div className="d-flex flex-column text-right mr-2">
                  <span className="phone_number">phone number: </span>
                  <span className="number">
                    <span className="nb"></span>81081882
                  </span>
                </div>
              </div>

              <div className="btn_container">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="edit_btn btns"
                >
                  Edit
                </button>
                <button onClick={() => logout()} className="logout_btn btns">
                  Logout
                </button>
                <button
                  onClick={() => navigate('wishList')}
                  className="wish_list-btn btns"
                >
                  <AiFillHeart />
                </button>
              </div>

              {/* {isAdmin && (
                <div className="admin">
                  <Link className="admin_link" to="/adminPanel">
                    <span>Admin Panel</span>
                    <i className="fa-solid fa-lock"></i>
                  </Link>
                </div>
              )} */}
            </div>
          </div>
        </>
      )}

      {showEditForm && (
        <EditProfile userData={userData} closeEditForm={closeEditForm} />
      )}
    </>
  );
};

export default Profile;
