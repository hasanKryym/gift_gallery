import React from 'react';
import './HomeLink.css';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const HomeLink = () => {
  return (
    <>
      <Link to="/" className="home_link">
        <AiFillHome />
      </Link>
    </>
  );
};

export default HomeLink;
