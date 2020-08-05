import React, { Component } from "react";
import { Link } from "react-router-dom";

const bookNow = [
  {
    id: 1,
    title: "Doctor Consultation",
    des: "Easy access to Doctors",
    link: "/doctors",
    src: "/img/medh2.png"
  },
  {
    id: 2,
    title: "Lab Services",
    des: "Easy Sample Collection & Quick Report Delivery",
    link: "/alltests",
    src: "/img/medh1.png"
  },
  {
    id: 3,
    title: "Medicines and Medical Supplies",
    des: "Quick and Easy Delivery",
    link: "/meditems",
    src: "/img/medh3.png"
  },
];
class BookNow extends Component {
  
  render() {

    return (
      <div className="bookdiv row m-0 my-4">
        {bookNow.map((book, index) => (
          <div key={index} className="col-lg-4 my-2">
            <div className="home-cards p-2 shadow rounded">
              <div key={index}>
                <Link to={book.link} class="text-decoration-none text-dark ">   
                <div>
                  <img src={book.src} alt="" className="img-fluid" />
                  <div className="home-card-inner my-2">
                    <h5>{book.title}</h5>
                    <div className="home-card-subtitle">
                      <small>{book.des}</small>
                    </div>
                    <div className="text-center my-2 get-started">
                      <h6 className="m-2">
                        GET STARTED <i className="fa fa-angle-right fa-lg" aria-hidden="true"></i>
                      </h6>
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            </div>
          </div>

        ))}
      </div>
    );
  }
}

export default BookNow;
