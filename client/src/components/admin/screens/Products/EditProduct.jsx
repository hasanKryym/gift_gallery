import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { editProduct, fetchProduct } from '../../../../utils/data';
import { useNavigate, useParams } from 'react-router';
import AdminSideBar from '../../SideBar/AdminSideBar';
import Loading from '../../../Loading/Loading';

const EditProduct = () => {
  const { id: product_id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    product_name: '',
    product_desc: '',
    product_price: '',
    category_id: '',
    product_image: '',
  });

  const {
    product_name,
    product_desc,
    product_price,
    category_id,
    product_image,
  } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(true);
  const [gender, setGender] = useState('male');
  useEffect(() => {
    const response = fetchProduct(product_id);
    response.then(
      ({ product_name, product_desc, product_price, category_id }) => {
        if (category_id === 'male') {
          setGender('male');
          setInputs({
            ...inputs,
            product_name: product_name,
            product_desc: product_desc,
            product_price: product_price,
            category_id: 'ec497a7b-cfb1-4dd0-98b2-4a285b801c28',
          });
        } else {
          setGender('female');
          setInputs({
            ...inputs,
            product_name: product_name,
            product_desc: product_desc,
            product_price: product_price,
            category_id: '49557c7d-caa6-4450-8dae-64346a23d6bf',
          });
        }
        setIsLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (gender === 'male')
      setInputs({
        ...inputs,
        category_id: 'ec497a7b-cfb1-4dd0-98b2-4a285b801c28',
      });
    else
      setInputs({
        ...inputs,
        category_id: '49557c7d-caa6-4450-8dae-64346a23d6bf',
      });
  }, [gender]);

  const EditProduct = (e) => {
    e.preventDefault();

    const flag = product_name && product_desc && product_price;

    if (flag) {
      const response = editProduct(inputs, product_id);
      response.then((res) => {
        console.log(res);
        if (res.success) {
          navigate('/adminPanel/products/productsDetails');
        }
      });
    } else
      toast.info('please fill all the inputs', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
  };

  return (
    <>
      <AdminSideBar />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="admin_container">
          <div className="details_container add_products">
            <section className="section_form">
              <form
                id="consultation-form"
                className="feed-form"
                onSubmit={EditProduct}
              >
                <input
                  autoComplete="off"
                  type="text"
                  name="product_name"
                  placeholder="Product Name"
                  value={product_name}
                  onChange={(e) => onChange(e)}
                />
                <input
                  autoComplete="off"
                  type="text"
                  name="product_desc"
                  placeholder="Product description"
                  value={product_desc}
                  onChange={(e) => onChange(e)}
                />
                <input
                  autoComplete="off"
                  type="number"
                  min="0"
                  name="product_price"
                  placeholder="Product Price ($)"
                  value={product_price}
                  onChange={(e) => onChange(e)}
                />

                {/* Gender */}

                <div className="radio-input-wrapper">
                  <label className="label">
                    <input
                      checked={gender === 'male' && 'true'}
                      value="male"
                      name="value-radio"
                      id="value-2"
                      className="radio-input"
                      type="radio"
                      onClick={() => setGender('male')}
                    />
                    <div className="radio-design"></div>
                    <div className="label-text">Male</div>
                  </label>
                  <label className="label">
                    <input
                      checked={gender === 'female' && 'true'}
                      value="female"
                      name="value-radio"
                      id="value-3"
                      className="radio-input"
                      type="radio"
                      onClick={() => setGender('female')}
                    />
                    <div className="radio-design"></div>
                    <div className="label-text">Female</div>
                  </label>
                  {/* <label className="label">
                  <input
                    value="null"
                    name="value-radio"
                    id="value-4"
                    className="radio-input"
                    type="radio"
                    onClick={() => setInputs({ ...inputs, category_id: null })}
                  />
                  <div className="radio-design"></div>
                  <div className="label-text">Null</div>
                </label> */}
                </div>

                <button type="submit" className="button_submit">
                  Edit
                </button>
              </form>
            </section>
          </div>
        </section>
      )}

      <ToastContainer />
    </>
  );
};

export default EditProduct;
