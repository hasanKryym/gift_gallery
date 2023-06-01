import { Widget } from '@uploadcare/react-widget';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  return (
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
            navigate('/');
            setFormData((prevState) => ({
              ...prevState,
              profile: info.cdnUrl,
            }));
          });
        }
      }}
      onChange={(info) => console.log('upload completed: ', info)}
    />
  );
};

export default AddProduct;
