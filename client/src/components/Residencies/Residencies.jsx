import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { sliderSettings } from '../../utils/common';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import './Residencies.css';
import data from '../../utils/slider.json';
import { fetchProducts, fetchRecommendedProducts } from '../../utils/data';
import image from '../../images/r2.png';

const Residencies = () => {
  const navigate = useNavigate();

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const productsData = fetchRecommendedProducts();
    productsData.then((res) => {
      setRecommendedProducts(res);
    });
  }, []);

  const showProductDetails = (product_id) => {
    navigate(`/product/${product_id}`);
  };

  return (
    <>
      <section className="r-wrapper">
        <div className="paddings innerWidth r-container">
          <div className="r-head flexColStart">
            <span className="orangeText">Best Choices</span>
            <span className="primaryText">Popular Residencies</span>
          </div>

          {/* <img src={require(`${data[0].image}`)} alt="home" /> */}

          <Swiper {...sliderSettings}>
            <SliderButtons />
            {recommendedProducts.map(
              ({ product_id, product_name, product_desc, product_price }) => (
                <SwiperSlide key={product_id}>
                  <div
                    onClick={() => showProductDetails(product_id)}
                    className="flexColStart r-card"
                  >
                    <img src={image} alt="home" />
                    <span className="secondaryText r-price">
                      <span style={{ color: 'orange' }}>$</span>
                      <span>{product_price}</span>
                    </span>

                    <span className="primaryText">{product_name}</span>
                    <span className="secondaryText">{product_desc}</span>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Residencies;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <>
      <div className="flexCenter r-buttons">
        <button onClick={() => swiper.slidePrev()}>&lt;</button>
        <button onClick={() => swiper.slideNext()}>&gt;</button>
      </div>
    </>
  );
};
