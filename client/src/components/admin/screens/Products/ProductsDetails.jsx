import React from 'react';
import AdminSideBar from '../../SideBar/AdminSideBar';
import Products from '../../../Product/Products';
import { Link } from 'react-router-dom';

const ProductsDetails = () => {
  return (
    <>
      <AdminSideBar />
      <div className="manage_products-header">
        <Link to="/adminPanel/products/addproduct">
          <button title="Add new Product" className="manage_products-add_btn">
            <i class="fa-solid fa-plus"></i>
          </button>
        </Link>
      </div>
      <section className="admin_container">
        <div className="details_container">
          <Products fromAdminPanel={true} />
        </div>
      </section>
    </>
  );
};

export default ProductsDetails;
