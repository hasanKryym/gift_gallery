// Products Data

const fetchProducts = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/products`);

    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const fetchProduct = async (product_id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/products/${product_id}`
    );

    const parseRes = await response.json();

    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const fetchRecommendedProducts = async () => {
  try {
    const response = await fetch(
      'http://localhost:5000/api/v1/products/filter/recommended'
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const filterByCategory = async (category_id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/products/filter/category/${category_id}`
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const filterByPrice = async (min, max) => {
  try {
    const body = { min, max };
    const response = await fetch(
      'http://localhost:5000/api/v1/products/filter/price',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getProductsCount = async () => {
  try {
    const response = await fetch(
      'http://localhost:5000/api/v1/products/filter/count'
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

// Users Data

const getUserData = async (user_id) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${user_id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const parseRes = await response.json();
      return parseRes;
    } else alert('please login');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchProducts,
  fetchProduct,
  fetchRecommendedProducts,
  filterByCategory,
  filterByPrice,
  getProductsCount,
  getUserData,
};
