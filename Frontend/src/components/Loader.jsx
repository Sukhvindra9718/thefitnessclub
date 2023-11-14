import React from 'react';
import { RingLoader, BarLoader, SyncLoader } from 'react-spinners';

const Loader = ({loading}) => {

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}>

      {/* Ring Loader */}
      {/* <div className="loader-container">
        <h3>Ring Loader</h3>
        <RingLoader loading={loading} color={'#36D7B7'} size={100} />
      </div> */}

      {/* Bar Loader */}
      {/* <div className="loader-container">
        <h3>Bar Loader</h3>
        <BarLoader loading={loading} color={'#FF7F50'} height={5} width={150} />
      </div> */}

      {/* Sync Loader */}
      <div className="loader-container">
        <SyncLoader loading={loading} color={'#6495ED'} size={10} margin={5} />
      </div>
    </div>
  );
};

export default Loader;
