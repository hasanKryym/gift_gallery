import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <>
      <div className="loader_container">
        <div className="loader">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      </div>
    </>
  );
};

export default Loading;
