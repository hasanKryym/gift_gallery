import React, { useEffect, useState } from 'react';
import './WishList.css';
import { Link, useNavigate } from 'react-router-dom';
import { getWishList, removeFromWishList } from '../../../utils/data';
import Product from '../../Product/Product';
import Loading from '../../Loading/Loading';

const WishList = () => {
  const [wishListProdcuts, setWishListProdcuts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateWishListData = (product_id) => {
    removeFromWishList(product_id);
  };

  useEffect(() => {
    const wishList = getWishList();
    wishList.then((res) => {
      setWishListProdcuts(res);
      setIsLoading(false);
    });
  }, [updateWishListData]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="products_container">
          {wishListProdcuts.length !== 0 ? (
            wishListProdcuts.map((product) => {
              return (
                <Product
                  key={product.product_id}
                  {...product}
                  fromWishList={true}
                  updateWishListData={updateWishListData}
                />
              );
            })
          ) : (
            <div>
              wishList empty{' '}
              <span>
                <Link className="products_link" to={'/products'}>
                  Products
                </Link>
              </span>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default WishList;
