// Spinner.jsx
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto'
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader 
        color='#4338ca'
        loading={loading}
        cssOverride={override}
        size={150}
    />
  );
};

// Add jobLoader export
export const jobLoader = () => {
  return <Spinner loading={true} />;
};

export default Spinner;
