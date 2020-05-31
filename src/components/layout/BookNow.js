import React, { Component } from "react";
import { Link } from "react-router-dom";

class BookNow extends Component {
  render() {
    const bookNow = [
      {
        id: 1,
        title: "Doctor Consultation",
        des:"Easy access to Doctors",
        link: "/doctors",
        src: "/img/doc.jpg"
      },
      {
        id: 2,
        title: "Lab Services",
        des:"Easy Sample Collection & Quick Report Delivery",
        link: "/alltests",
        src: "/img/test.jpg"
      },
      {
        id: 3,
        title: "Medicines and Medical Supplies",
        des:"Quick and Easy Delivery",
        link: "/medicine",
        src: "/img/meds.jpg"
      },
    ];

    return (
      <div className="bookdiv">
        <div className="home-cards">
        {bookNow.map((book, index) => (
          <div key={index}>
            <img src={book.src} alt="" />
            <h3>{book.title}</h3>
            <p>{book.des}</p>
            <Link to={book.link}>
              GET STARTED <i className="fa fa-angle-right fa-lg" aria-hidden="true"></i>
            </Link>
          </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BookNow;
