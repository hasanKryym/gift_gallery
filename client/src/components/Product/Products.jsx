import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../utils/data';
import Loading from '../Loading/Loading';
import Product from './Product';
import FilterData from '../FilterData/FilterData';

const Products = () => {
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <FilterData filterProducts={filterProducts} />
          <section className="products_container">
            {products.map((product) => {
              return <Product key={product.product_id} {...product} />;
            })}
          </section>
        </>
      )}
    </>
  );
};

export default Products;
