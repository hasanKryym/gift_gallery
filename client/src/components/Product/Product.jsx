import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({
  product_id,
  product_name,
  product_desc,
  product_price,
  category_id,
}) => {
  const navigate = useNavigate();

  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);

  const filterProducts = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const showProductDetails = (product_id) => {
    navigate(`/product/${product_id}`);
  };
  return (
    <article
      onClick={() => showProductDetails(product_id)}
      key={product_id}
      className="single_product"
    >
      <div className="image_container">
        <img src="./r1.png" alt="" className="product_image" />
      </div>
      <div className="product_details">
        <span className="primaryText">{product_name}</span>
        <p className="secondaryText">{product_desc}</p>
        <p className="product_price">
          <span style={{ color: 'orange' }}>$</span>
          {product_price}
        </p>
      </div>
      <div className="product_btn_container">
        <button className="button">Add To Cart</button>
      </div>
    </article>
  );
};

export default Product;
