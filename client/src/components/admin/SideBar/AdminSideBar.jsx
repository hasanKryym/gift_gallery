import React from 'react';
import './AdminSideBar.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminSideBar = () => {
  const navigate = useNavigate();

  return (
    <nav class="main-menu">
      <ul>
        <li>
          <Link to="/">
            <i class="fa fa-home fa-2x"></i>
            <span class="nav-text">Home</span>
          </Link>
        </li>

        <li class="has-subnav">
          <Link to="/adminPanel/products">
            <i class="fa fa-solid fa-box"></i>
            <span class="nav-text">Products</span>
          </Link>
        </li>

        <li>
          <Link to="#">
            <i class="fa fa-solid fa-magnifying-glass-dollar"></i>
            <span class="nav-text">tramsactions</span>
          </Link>
        </li>

        <li>
          <Link to="#">
            <i class="fa fa-cogs fa-2x"></i>
            <span class="nav-text">Tools & Resources</span>
          </Link>
        </li>

        <li>
          <Link to="#">
            <i class="fa fa-info fa-2x"></i>
            <span class="nav-text">Documentation</span>
          </Link>
        </li>
      </ul>

      <ul class="logout">
        <li
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
        >
          <Link to="#">
            <i class="fa fa-power-off fa-2x"></i>
            <span class="nav-text">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSideBar;
