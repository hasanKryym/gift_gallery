import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../utils/data';
import Loading from '../Loading/Loading';
import Product from './Product';
import FilterData from '../FilterData/FilterData';
import HomeLink from '../HomeLink/HomeLink';
// import './Product.css';

const Products = ({ fromAdminPanel }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const productsData = fetchProducts();
    productsData.then((res) => {
      setProducts(res);
      setIsLoading(false);
    });
  }, []);

  const filterProducts = (filtered) => {
    setProducts(filtered);
  };
  const changeLoadingState = (state) => {
    setIsLoading(state);
  };

  const deleteProduct = (product_id) => {
    const newProducts = products.filter((product) => {
      return product.product_id !== product_id;
    });
    setProducts(newProducts);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!fromAdminPanel && <HomeLink />}
          <FilterData filterProducts={filterProducts} />

          {products.length !== 0 ? (
            <>
              <section className="products_container">
                {products.map((product) => {
                  return (
                    <Product
                      key={product.product_id}
                      {...product}
                      fromWishList={false}
                      fromAdminPanel={fromAdminPanel}
                      deleteProductFromFrontEnd={deleteProduct}
                    />
                  );
                })}
              </section>
            </>
          ) : (
            <p className="empty_products">empty</p>
          )}
        </>
      )}
    </>
  );
};

export default Products;
