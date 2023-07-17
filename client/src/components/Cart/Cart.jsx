import React, { useEffect, useState } from 'react';
import './Cart.css';
import { deleteFromCart, getCartData } from '../../utils/data';
import CartProduct from './CartProduct';
import { Link, useNavigate } from 'react-router-dom';
import checkAuth from '../../utils/checkAuth';
import Loading from '../Loading/Loading';

// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let finalCost = 0;

  const deleteProduct = (product_id) => {
    const newData = cartData.filter((product) => {
      return product.product_id !== product_id;
    });
    setCartData(newData);
    deleteFromCart(product_id);
  };
  const updateCartQuantity = (product_id, product_quantity) => {
    const newData = cartData.map((product) => {
      if (product.product_id === product_id)
        product.product_quantity = product_quantity;
      return product;
    });
    setCartData(newData);
  };

  const getData = async () => {
    const data = await getCartData();
    setCartData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const isAuthorized = checkAuth();
    isAuthorized.then((res) => {
      if (res === false) navigate('/login');
    });
    getData();
  }, []);

  // useEffect(() => {
  // const cart = getCartData();
  // cart.then((res) => {
  //   setCartData(res);
  //   setIsLoading(false);
  // });
  //   getData();
  // }, [deleteProduct]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <div className="basket">
            {/* <div class="basket-module">
            <label for="promo-code">Enter a promotional code</label>
            <input
              id="promo-code"
              type="text"
              name="promo-code"
              maxlength="5"
              class="promo-code-field"
            />
            <button class="promo-code-cta">Apply</button>
          </div> */}
            <div className="basket-labels">
              <ul>
                <li className="item item-heading">Item</li>
                <li className="price">Price</li>
                <li className="quantity">Quantity</li>
                <li className="subtotal">Subtotal</li>
              </ul>
            </div>
            {cartData.length !== 0 ? (
              cartData.map((product) => {
                finalCost += product.product_price * product.product_quantity;
                return (
                  <CartProduct
                    key={product.product_id}
                    {...product}
                    deleteProduct={deleteProduct}
                    updateCartQuantity={updateCartQuantity}
                  />
                );
              })
            ) : (
              <>
                <div>
                  cart is empty{' '}
                  <span>
                    <Link className="products_link" to={'/products'}>
                      Products
                    </Link>
                  </span>
                </div>
              </>
            )}
          </div>
          <aside>
            <div className="summary">
              <div className="summary-total-items">
                <span className="total-items"></span> Items in your Bag
              </div>
              <div className="summary-subtotal">
                {/* <div class="subtotal-title">Subtotal</div>
              <div class="subtotal-value final-value" id="basket-subtotal">
                {finalCost}
              </div> */}
                <div className="summary-promo hide">
                  <div className="promo-title">Promotion</div>
                  <div
                    className="promo-value final-value"
                    id="basket-promo"
                  ></div>
                </div>
              </div>
              {/* <div className="summary-delivery">
              <select
                name="delivery-collection"
                className="summary-delivery-selection"
              >
                <option value="0">Select Collection or Delivery</option>
                <option value="collection">Collection</option>
                <option value="first-class">Royal Mail 1st Class</option>
                <option value="second-class">Royal Mail 2nd Class</option>
                <option value="signed-for">Royal Mail Special Delivery</option>
              </select>
            </div> */}
              <div className="summary-total">
                <div className="total-title">Total</div>
                <div className="total-value final-value" id="basket-total">
                  {'$' + finalCost}
                </div>
              </div>
              <div className="summary-checkout">
                <button className="checkout-cta">Go to Secure Checkout</button>
              </div>
            </div>
          </aside>
        </main>
      )}
    </>
  );
};

export default Cart;
