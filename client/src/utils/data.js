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

const addToRecommendedProducts = async (product_id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5000/api/v1/products/filter/recommended/${product_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const removeFromRecommended = async (product_id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5000/api/v1/products/filter/recommended/${product_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }
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

const addProduct = async (product) => {
  try {
    const {
      product_name,
      product_desc,
      product_price,
      category_id,
      product_image,
    } = product;

    const body = {
      product_name,
      product_desc,
      product_price,
      category_id,
      product_image,
    };

    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/v1/products`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const editProduct = async (product, product_id) => {
  try {
    const { product_name, product_desc, product_price, category_id } = product;

    const body = {
      product_name,
      product_desc,
      product_price,
      category_id,
    };

    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5000/api/v1/products/${product_id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`,
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

const deleteProduct = async (product_id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5000/api/v1/products/${product_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }
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
        method: 'POST',
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

// wishList

const addToWishList = async (product_id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5000/api/v1/wishList/${product_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err.message);
  }
};

const removeFromWishList = async (product_id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5000/api/v1/wishList/${product_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err.message);
  }
};

const getWishList = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/v1/wishList`, {
      headers: { Authorization: `${token}` },
    });

    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

// Cart

const addToCart = async (product_id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5000/api/v1/cart/${product_id}`,
      {
        headers: { Authorization: `${token}` },
        method: 'POST',
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getCartData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/v1/cart`, {
      headers: { Authorization: `${token}` },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const deleteFromCart = async (product_id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5000/api/v1/cart/${product_id}`,
      {
        headers: { Authorization: `${token}` },
        method: 'DELETE',
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const updateCart = async (product_id, product_quantity) => {
  try {
    const token = localStorage.getItem('token');
    const body = { product_quantity };
    const response = await fetch(
      `http://localhost:5000/api/v1/cart/${product_id}`,
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(body),
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchProducts,
  fetchProduct,
  addToRecommendedProducts,
  removeFromRecommended,
  fetchRecommendedProducts,
  addProduct,
  editProduct,
  deleteProduct,
  filterByCategory,
  filterByPrice,
  getProductsCount,
  getUserData,
  addToWishList,
  getWishList,
  removeFromWishList,
  addToCart,
  getCartData,
  deleteFromCart,
  updateCart,
};
