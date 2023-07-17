import React from 'react';
import './GetStarted.css';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <>
      <section className="g-wrapper">
        <div className="paddings innerWidth g-container">
          <div className="flexColCenter inner-container">
            <span className="primaryText">Get Started with Gift_gallery</span>
            <span className="secondaryText">
              Subscribe and find super attractive price quotes from
              <br />
              Find your residence soon
            </span>

            <Link className="button" to="/register">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetStarted;
