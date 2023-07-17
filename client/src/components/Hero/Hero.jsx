import React from 'react';
import './Hero.css';
import CountUp from 'react-countup';
// import { HiLocationMarker } from 'react-icons/hi';
import hero from '../../images/hero.jpg';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <>
      <section className="hero-wrapper">
        <div className="paddings innerWidth flexCenter hero-container">
          {/* left side */}
          <div className="flexColStart hero-left">
            <div className="hero-title">
              <div className="orange-circle" />
              <motion.h1
                initial={{ y: '2rem', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: 'spring',
                }}
              >
                Discover <br />
                Most Suitable <br />
                Clothes
              </motion.h1>
            </div>

            <div className="flexColStart hero-des">
              <span className="secondaryText">
                Find a variety of clothes that suit you very easily
              </span>
              {/* <span className="secondaryText">
                Forget all difficulties in finding a clothes for you
              </span> */}
            </div>

            {/* <div className="flexCenter search-bar">
              <HiLocationMarker className="hero-icon" />
              <input type="text" />
              <button className="button">Search</button>
            </div> */}

            <div className="flexCenter stats">
              <div className="flexColCenter stat">
                <span>
                  <CountUp start={8800} end={9000} duration={4} />
                  <span>+</span>
                </span>
                <span className="secondaryText">premium Products</span>
              </div>

              <div className="flexColCenter stat">
                <span>
                  <CountUp start={1950} end={2000} duration={4} />
                  <span>+</span>
                </span>
                <span className="secondaryText">Happy Customers</span>
              </div>

              <div className="flexColCenter stat">
                <span>
                  <CountUp end={28} />
                  <span>+</span>
                </span>
                <span className="secondaryText">Award Winning</span>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="flexCenter hero-right">
            <motion.div
              initial={{ x: '7rem', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: 'spring',
              }}
              className="image-container"
            >
              <img src={hero} alt="" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
