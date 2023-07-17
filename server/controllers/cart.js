const pool = require('../db/connect');

const addToCart = async (req, res) => {
  try {
    const user_id = req.user;
    const { id: product_id } = req.params;
    const data = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
      [user_id, product_id]
    );
    if (data.rows.length === 0) {
      await pool.query(
        'INSERT INTO cart(user_id, product_id) VALUES ($1, $2)',
        [user_id, product_id]
      );
    } else {
      let productQuantity = await pool.query(
        'SELECT product_quantity FROM cart WHERE user_id = $1 AND product_id = $2',
        [user_id, product_id]
      );

      productQuantity = productQuantity.rows[0].product_quantity;
      productQuantity++;

      await pool.query(
        'UPDATE cart SET product_quantity = $1 WHERE user_id = $2 AND product_id = $3',
        [productQuantity, user_id, product_id]
      );
    }
    // const newCartData = await pool.query(
    //   'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
    //   [user_id, product_id]
    // );
    return res
      .status(200)
      .json({ success: true, msg: 'product added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const getCart = async (req, res) => {
  try {
    const user_id = req.user;
    let cartData = await pool.query(
      'SELECT * FROM products WHERE product_id IN (SELECT product_id FROM cart WHERE user_id = $1)',
      [user_id]
    );
    if (cartData.rows.length === 0) return res.status(200).json(cartData.rows);
    cartData = cartData.rows;

    // let myPromise = new Promise(function (myResolve, myReject) {
    //   // "Producing Code" (May take some time)

    //   myResolve(); // when successful
    //   myReject(); // when error
    // });

    // // "Consuming Code" (Must wait for a fulfilled Promise)
    // myPromise.then(
    //   function (value) {
    //     /* code if successful */
    //   },
    //   function (error) {
    //     /* code if some error */
    //   }
    // );
    cartData.map(async (product, index) => {
      let product_quantity = await pool.query(
        'SELECT product_quantity FROM cart WHERE product_id = $1 AND user_id = $2',
        [product.product_id, user_id]
      );
      product.product_quantity = product_quantity.rows[0].product_quantity;
      if (index === cartData.length - 1) return res.status(200).json(cartData);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const user_id = req.user;
    const { id: product_id } = req.params;
    const { deleteType } = req.body;
    if (deleteType === 'empty') {
      await pool.query('DELETE FROM cart WHERE user_id = $1', [user_id]);
      return res
        .status(200)
        .json({ success: true, msg: 'cart deleted successfully' });
    } else {
      await pool.query(
        'DELETE FROM cart WHERE user_id = $1 AND product_id = $2',
        [user_id, product_id]
      );
      return res
        .status(200)
        .json({ success: true, msg: 'product deleted successfully' });
      // const data = await pool.query(
      //   'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
      //   [user_id, product_id]
      // );
      // if (data.rows.length === 0) {
      //   return res
      //     .status(200)
      //     .json({ success: false, msg: 'item already is not added to cart' });
      // } else {
      //   let productQuantity = await pool.query(
      //     'SELECT product_quantity FROM cart WHERE user_id = $1 AND product_id = $2',
      //     [user_id, product_id]
      //   );

      //   productQuantity = productQuantity.rows[0].product_quantity;
      //   productQuantity--;
      //   if (productQuantity === 0)
      //     await pool.query(
      //       'DELETE FROM cart WHERE user_id = $1 AND product_id = $2',
      //       [user_id, product_id]
      //     );
      //   else
      //     await pool.query(
      //       'UPDATE cart SET product_quantity = $1 WHERE user_id = $2 AND product_id = $3',
      //       [productQuantity, user_id, product_id]
      //     );
      // }
      // const newCartData = await pool.query(
      //   'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
      //   [user_id, product_id]
      // );
      // return res.status(200).json(newCartData.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const updateCart = async (req, res) => {
  try {
    const user_id = req.user;
    const { id: product_id } = req.params;
    const { product_quantity } = req.body;

    await pool.query(
      'UPDATE cart SET product_quantity = $1 WHERE user_id = $2 AND product_id = $3',
      [product_quantity, user_id, product_id]
    );

    return res
      .status(200)
      .json({ success: true, msg: 'product updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

module.exports = {
  addToCart,
  getCart,
  deleteFromCart,
  updateCart,
};
