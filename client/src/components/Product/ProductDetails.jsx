import React, { useEffect, useState } from 'react';
import './Product.css';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../utils/data';
import Loading from '../Loading/Loading';
const Product = () => {
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState({});
  const {
    product_id,
    product_name,
    product_desc,
    product_price,
    product_image,
  } = product;

  useEffect(() => {
    const product = fetchProduct(id);
    product.then((res) => {
      setProduct(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="product-container">
          <div className="product">
            <div className="product-img_container">
              <img src={product_image} alt="" />
            </div>

            <div className="desc-container">
              <h2 className="product-title primaryText">{product_name}</h2>
              <p className="secondaryText">{product_desc}</p>
              <p className="secondaryText product-price">
                <span className="product_price-span">price</span>: $
                {product_price}
              </p>

              <div className="btns-container">
                <button className="button">AddToCart</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Product;
