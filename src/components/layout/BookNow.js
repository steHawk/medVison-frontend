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
      <div className="bookdiv">
        {bookNow.map((book, index) => (
          <div key={index} className="home-cards">

            <div key={index}>
              <Link to={book.link} >   
              <div className="home-card-i">

              <img src={book.src} alt="" />

                <div className="home-card-inner">
                <h3>{book.title}</h3>
                <p>{book.des}</p>
                <h4>
                  GET STARTED <i className="fa fa-angle-right fa-lg" aria-hidden="true"></i>
                </h4>
                </div>

                
                </div>
                </Link>

            </div>
          </div>

        ))}
      </div>
    );
  }
}

export default BookNow;
