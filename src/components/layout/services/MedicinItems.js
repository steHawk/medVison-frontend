import React, { Component } from "react";


class MedicineItems extends Component {


  render() {
    return (
      <div>
        <div className="filter_med">
          <p>Prescription Medicines</p>
          <p>Over-the-counter (OTC)</p>
          <p>Baby Care</p>
          <p>Personal Care</p>
          <p>Supplements & Wellness Products</p>
          <p>Medical & Surgical Devices</p>
          <p>Immunity Boosters</p>
          <p>Hand-Hygiene</p>
        </div>
     
        <div className="med_i">
            <div className="meditems">
                <img src="/img/azy.jpg" alt="" />
                <div>
                <h1>Azithromycin 500MG</h1>
                <strong>Package size : <p>10 CAPSULES IN A STRIP</p></strong>
                <strong>Description : <p>It is used for treating bladder infections.</p></strong>
                </div>
                <div>
                <div className="buy_but">
                <h2>₹252</h2>
                <button className="addb">Add to Cart</button>
                </div>
                </div>
            </div>

            <div className="meditems">
                <img src="/img/azy.jpg" alt="" />
                <div>
                <h1>Azithromycin 500MG</h1>
                <strong>Package size : <p>10 CAPSULES IN A STRIP</p></strong>
                <strong>Description : <p>It is used for treating bladder infections.</p></strong>
                </div>
                <div>
                <div className="buy_but">
                <h2>₹252</h2>
                <button className="addb">Add to Cart</button>
                </div>
                </div>
            </div>
           
            <div className="meditems">
                <img src="/img/azy.jpg" alt="" />
                <div>
                <h1>Azithromycin 500MG</h1>
                <strong>Package size : <p>10 CAPSULES IN A STRIP</p></strong>
                <strong>Description : <p>It is used for treating bladder infections.</p></strong>
                </div>
                <div>
                <div className="buy_but">
                <h2>₹252</h2>
                <button className="addb">Add to Cart</button>
                </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default MedicineItems;
