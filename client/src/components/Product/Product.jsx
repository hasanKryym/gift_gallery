import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillHeart } from 'react-icons/ai';
import { CiSquareRemove } from 'react-icons/ci';
import {
  addToCart,
  addToRecommendedProducts,
  addToWishList,
  deleteProduct,
} from '../../utils/data';
import checkAuth from '../../utils/checkAuth';

const Product = ({
  product_id,
  product_name,
  product_desc,
  product_price,
  category_id,
  product_image,
  fromWishList,
  fromAdminPanel,
  updateWishListData,
  deleteProductFromFrontEnd,
}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    const loggedIn = await checkAuth();
    setIsLoggedIn(loggedIn);
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const showProductDetails = (product_id) => {
    navigate(`/product/${product_id}`);
  };
  return (
    <>
      <article key={product_id} className="single_product">
        <div
          className="product_info"
          onClick={() => showProductDetails(product_id)}
        >
          <div className="image_container">
            <img src={product_image} alt="" className="product_image" />
          </div>
          <div className="product_details">
            <span className="primaryText">{product_name}</span>
            <p className="secondaryText">{product_desc}</p>
            <p className="product_price">
              <span style={{ color: 'orange' }}>$</span>
              {product_price}
            </p>
          </div>
        </div>
        <div className="product_btn_container">
          {!fromAdminPanel ? (
            <button
              className="button"
              onClick={() => {
                if (isLoggedIn) {
                  addToCart(product_id);
                  toast.success('Product added to cart', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  });
                } else
                  toast.warn('Please Login', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  });
              }}
            >
              Add To Cart
            </button>
          ) : (
            <>
              <Link
                to={`/adminPanel/products/productsDetails/edit/${product_id}`}
              >
                <button className="button">Edit</button>
              </Link>
              <button
                onClick={() => {
                  const response = addToRecommendedProducts(product_id);
                  response.then((res) => {
                    toast.success(res.msg, {
                      position: 'top-right',
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'light',
                    });
                  });
                }}
                title="Add to recommended products"
                className="button"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
              <button
                className="button heart_btn"
                title="Delete Product"
                onClick={() => {
                  deleteProductFromFrontEnd(product_id);
                  deleteProduct(product_id);
                }}
              >
                <CiSquareRemove />
              </button>
            </>
          )}

          {!fromWishList && !fromAdminPanel && (
            <button
              className="button heart_btn"
              onClick={() => {
                if (isLoggedIn) {
                  addToWishList(product_id);
                  toast.success('Product added to wishlist!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  });
                } else
                  toast.warn('Please Login', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  });
              }}
            >
              <AiFillHeart />
            </button>
          )}
          {fromWishList && !fromAdminPanel && (
            <button
              className="button heart_btn"
              onClick={() => updateWishListData(product_id)}
            >
              <CiSquareRemove />
            </button>
          )}
        </div>
      </article>
      <ToastContainer />
    </>
  );
};

export default Product;
