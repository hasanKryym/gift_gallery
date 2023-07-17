import React, { useEffect, useState } from 'react';
import './FilterData.css';
import {
  fetchProducts,
  filterByCategory,
  getProductsCount,
} from '../../utils/data';

const FilterData = ({ filterProducts }) => {
  const [filters, setFilters] = useState({
    all: true,
    male: false,
    female: false,
  });

  const [productsCount, setProductsCount] = useState({
    countAllProducts: 0,
    countMaleProducts: 0,
    countFemaleProducts: 0,
  });

  const sortData = (type) => {
    if (type === 'All')
      setFilters({ ...filters, all: true, male: false, female: false });
    if (type === 'Male')
      setFilters({ ...filters, all: false, male: true, female: false });
    if (type === 'Female')
      setFilters({ ...filters, all: false, male: false, female: true });
  };

  useEffect(() => {
    if (filters.all) {
      const productsData = fetchProducts();
      productsData.then((res) => {
        filterProducts(res);
      });
    }

    if (filters.male) {
      const productsData = filterByCategory(
        'ec497a7b-cfb1-4dd0-98b2-4a285b801c28'
      );
      productsData.then((res) => {
        filterProducts(res);
      });
    }

    if (filters.female) {
      const productsData = filterByCategory(
        '49557c7d-caa6-4450-8dae-64346a23d6bf'
      );
      productsData.then((res) => {
        filterProducts(res);
      });
    }
  }, [filters]);

  useEffect(() => {
    const productCount = getProductsCount();
    productCount.then((res) => {
      setProductsCount(res);
    });
  }, []);

  return (
    <>
      <div class="container">
        <div class="tabs">
          <input
            type="radio"
            id="radio-1"
            name="tabs"
            checked=""
            value="All"
            onChange={(e) => sortData(e.target.value)}
          />
          <label className="tab" for="radio-1">
            All
            <span className="notification">
              {productsCount.countAllProducts}
            </span>
          </label>
          <input
            type="radio"
            id="radio-2"
            name="tabs"
            value="Male"
            onChange={(e) => sortData(e.target.value)}
          />
          <label class="tab" for="radio-2">
            Male
            <span className="notification">
              {productsCount.countMaleProducts}
            </span>
          </label>
          <input
            type="radio"
            id="radio-3"
            name="tabs"
            value="Female"
            onChange={(e) => sortData(e.target.value)}
          />
          <label class="tab" for="radio-3">
            Female
            <span class="notification">
              {productsCount.countFemaleProducts}
            </span>
          </label>
          <span class="glider"></span>
        </div>
      </div>
    </>
  );
};

export default FilterData;
