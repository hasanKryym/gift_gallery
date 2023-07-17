import React from 'react';
import './Footer.css';
import logo from '../../images/gift_gallery-logo.png';

const Footer = () => {
  return (
    <>
      <section className="f-wrapper">
        <div className="paddings innerWidth flexCenter f-container">
          {/* left side */}
          <div className="flexColStart f-left">
            <img src={logo} alt="" className="logo" />

            {/* <span className="secondaryText">
              Our vision is to make all people <br />
              the best place to live for them.
            </span> */}
          </div>

          <div className="f-right flexColStart">
            <span className="primaryText">Information</span>
            <span className="secondaryText">145 New york, FL 4571, USA</span>

            <div className="flexCenter f-menu">
              <span>Property</span>
              <span>Services</span>
              <span>Product</span>
              <span>About Us</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
