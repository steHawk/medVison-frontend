import React from 'react';
import Prescription from './Prescription';
import OTC from './OTC';

const Medicine = () => {
    return (
        <div className="m_div">
          <Prescription/>
          <OTC />
        </div>
    );
}

export default Medicine;
