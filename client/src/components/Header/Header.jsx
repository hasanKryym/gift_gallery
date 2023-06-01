import React, { useEffect, useState } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, useNavigate } from 'react-router-dom';
import checkAuth from '../../utils/checkAuth';
import logo from '../../images/gift_gallery-logo.png';
const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const checkLoggedIn = async () => {
    const loggedIn = await checkAuth();
    if (loggedIn === true) {
      setIsLoggedIn(loggedIn);
      navigate('/');
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && '-100%' };
    }
  };
  return (
    <>
      <section className="h-wrapper">
        <div className="flexCenter paddings innerWidth h-container">
          {/* <img src="./logo.png" alt="logo" width={100} /> */}

          <img src={logo} alt="logo" className="logo" />

          <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
            <div
              className="flexCenter h-menu"
              style={getMenuStyles(menuOpened)}
            >
              <Link to="/products">Products</Link>
              <a href="">Cart</a>

              <Link to="/profile">Profile</Link>
              {isLoggedIn ? (
                <button onClick={() => logout()} className="button">
                  logout
                </button>
              ) : (
                <Link to="/login" className="button">
                  login
                </Link>
              )}
            </div>
          </OutsideClickHandler>

          <div
            className="menu-icon"
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <BiMenuAltRight size={30} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
