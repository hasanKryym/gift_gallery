import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { sliderSettings } from '../../utils/common';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import './Residencies.css';
import data from '../../utils/slider.json';
import {
  fetchRecommendedProducts,
  removeFromRecommended,
} from '../../utils/data';
import checkAdmin from '../../utils/checkAdmin';

const Residencies = () => {
  const navigate = useNavigate();

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const productsData = fetchRecommendedProducts();
    productsData.then((res) => {
      setRecommendedProducts(res);
    });

    const admin = checkAdmin();
    admin.then((res) => {
      setIsAdmin(res);
    });
  }, []);

  const showProductDetails = (product_id) => {
    navigate(`/product/${product_id}`);
  };

  const removeProduct = (product_id) => {
    const newRecmmendedProducts = recommendedProducts.filter((product) => {
      return product.product_id !== product_id;
    });
    setRecommendedProducts(newRecmmendedProducts);
    removeFromRecommended(product_id);
  };

  return (
    <>
      <section className="r-wrapper">
        <div className="paddings innerWidth r-container">
          <div className="r-head flexColStart">
            <span className="orangeText">Best Choices</span>
            <span className="primaryText">Popular Products</span>
          </div>

          {/* <img src={require(`${data[0].image}`)} alt="home" /> */}

          <Swiper {...sliderSettings}>
            <SliderButtons />
            {recommendedProducts.map(
              ({
                product_id,
                product_name,
                product_desc,
                product_price,
                product_image,
              }) => (
                <SwiperSlide key={product_id}>
                  <div className="flexColStart r-card">
                    <div
                      onClick={() => showProductDetails(product_id)}
                      className="flexColStart"
                    >
                      <img src={product_image} alt="home" />
                      <span className="secondaryText r-price">
                        <span style={{ color: 'orange' }}>$</span>
                        <span>{product_price}</span>
                      </span>

                      <span className="primaryText">{product_name}</span>
                      <span className="secondaryText">{product_desc}</span>
                    </div>
                    <div className="remove_recommended-btn">
                      {isAdmin && (
                        <button
                          onClick={() => removeProduct(product_id)}
                          className="button"
                        >
                          remove
                        </button>
                      )}
                    </div>
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
