import './Products.css';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import AdminSideBar from '../../SideBar/AdminSideBar';
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <>
      <AdminSideBar />
      <section className="admin_container">
        <div className="details_container">
          <header className="screen_header">
            <motion.article
              initial={{ y: '2rem', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: 'spring',
              }}
              className="header_article shadow"
            >
              <div className="article_info">
                <h1 className="screen_header-title">Products Quantity</h1>
                <p className="value">
                  <CountUp start={0} end={1000} duration={2} />
                </p>
              </div>
            </motion.article>
            <motion.article
              initial={{ y: '2rem', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: 'spring',
              }}
              className="header_article shadow"
            >
              <div className="article_info">
                <h1 className="screen_header-title">Products Price</h1>
                <p className="value">
                  <span>$</span>
                  <CountUp start={0} end={1230} duration={2} />
                </p>
              </div>
            </motion.article>
          </header>

          <div className="buttons_cotnainer">
            <Link to="addproduct">
              <button className="products_btns">Add Product</button>
            </Link>

            <Link to="productsDetails">
              <button className="products_btns">Manage Products</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
