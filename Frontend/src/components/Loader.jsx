import React from 'react';
import {SyncLoader } from 'react-spinners';

const Loader = ({loading}) => {

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}>
      <div className="loader-container">
        <SyncLoader loading={loading} color={'#6495ED'} size={10} margin={5} />
      </div>
    </div>
  );
};

export default Loader;
