import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = ({ closeEditForm, userData }) => {
  const [inputs, setInputs] = useState({
    user_name: `${userData.user_name}`,
    user_number: `${userData.user_number}`,
    user_address: `${userData.user_address}`,
  });

  const { user_name, user_number, user_address } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const editData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const body = { user_name, user_number, user_address };
    const response = await fetch(
      `http://localhost:5000/api/v1/users/${user_id}`,
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
    console.log(parseRes);
    if (parseRes.success) closeEditForm();
    else alert(parseRes.msg);
  };
  return (
    <>
      <div class="edit-card">
        <div className="edit_form-close_btn-container">
          <button
            className="edit_form-close_btn"
            onClick={() => closeEditForm()}
          >
            x
          </button>
        </div>
        <div class="card-header">
          <h1>Edit Profile</h1>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="username">Name</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required=""
                value={user_name}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div class="form-group">
              <label for="username">phone number</label>
              <input
                type="text"
                id="user_number"
                name="user_number"
                required=""
                value={user_number}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div class="form-group">
              <label for="username">Address</label>
              <input
                type="text"
                id="user_address"
                name="user_address"
                required=""
                value={user_address}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div class="form-group">
              <button
                onClick={(e) => editData(e)}
                type="submit"
                class="login-button"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
