import { Widget } from '@uploadcare/react-widget';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './AddProduct.css';
import AdminSideBar from '../../SideBar/AdminSideBar';
import { ToastContainer, toast } from 'react-toastify';
import { addProduct } from '../../../../utils/data';

const AddProduct = () => {
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

  const addNewProduct = (e) => {
    e.preventDefault();

    const flag = product_name && product_desc && product_price && product_image;

    const inputsValues = product_name && product_desc && product_price;

    if (flag) {
      const response = addProduct(inputs);
      response.then((res) => {
        if (res.success) {
          window.location.reload();
          toast.success('product added successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          // navigate('/adminPanel/products');
        }
      });
    } else if (product_image === '' && inputsValues)
      toast.info('please insert an image for the product', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    else
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
      <section className="admin_container">
        <div className="details_container add_products">
          <section className="section_form">
            <form
              id="consultation-form"
              className="feed-form"
              onSubmit={addNewProduct}
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
                    value="male"
                    name="value-radio"
                    id="value-2"
                    className="radio-input"
                    type="radio"
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        category_id: 'ec497a7b-cfb1-4dd0-98b2-4a285b801c28',
                      })
                    }
                  />
                  <div className="radio-design"></div>
                  <div className="label-text">Male</div>
                </label>
                <label className="label">
                  <input
                    value="female"
                    name="value-radio"
                    id="value-3"
                    className="radio-input"
                    type="radio"
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        category_id: '49557c7d-caa6-4450-8dae-64346a23d6bf',
                      })
                    }
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

              <Widget
                publicKey="9ee8f96922901c442e29"
                id="file"
                onFileSelect={(file) => {
                  if (file) {
                    file.progress((info) => {
                      console.log('file progress: ', info.progress);
                    });
                    file.done((info) => {
                      console.log('file uploaded: ', info.cdnUrl);
                      // navigate('/adminPanel');
                      setInputs((prevState) => ({
                        ...prevState,
                        product_image: info.cdnUrl,
                      }));
                    });
                  }
                }}
                onChange={(info) => {
                  console.log('upload completed: ', info);
                }}
              />

              <button type="submit" className="button_submit">
                Add
              </button>
            </form>
          </section>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default AddProduct;
