import React, { useEffect, useState } from 'react';
import image from '../../images/menClothes.png';
import { deleteFromCart, updateCart } from '../../utils/data';

const CartProduct = ({
  product_id,
  product_image,
  product_name,
  product_price,
  product_quantity,
  product_desc,
  category_id,
  deleteProduct,
  updateCartQuantity,
}) => {
  const [productQuantity, setProductQuantity] = useState(product_quantity);

  return (
    <>
      <div className="basket-product">
        <div className="item">
          <div className="product-image">
            <img
              src={image}
              alt="Placholder Image 2"
              className="product-frame"
            />
          </div>
          <div className="product-details">
            <h1>
              <strong>
                <span className="item-quantity">{'x' + productQuantity}</span>{' '}
                {product_name}
              </strong>{' '}
            </h1>
            <p>
              <strong>{product_desc}</strong>
            </p>
            {/* <p>Product Code - 232321939</p> */}
          </div>
        </div>
        <div className="price">${product_price}</div>
        <div className="quantity">
          <input
            type="number"
            value={productQuantity}
            min="1"
            className="quantity-field"
            onChange={async (e) => {
              setProductQuantity(e.target.value);
              updateCart(product_id, e.target.value);
              updateCartQuantity(product_id, e.target.value);
            }}
          />
        </div>
        <div className="subtotal">${product_price * productQuantity}</div>
        <div className="remove">
          <button
            className="remove_product"
            onClick={() => deleteProduct(product_id)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
