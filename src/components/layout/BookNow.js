import React, { Component } from "react";
import { Link } from "react-router-dom";

class BookNow extends Component {
  render() {
    const bookNow = [
      {
        id: 1,
        title: "Get Medical Test done simply at your Home",
        link: "/medtestform",
      },
      {
        id: 2,
        title: "Easy access to Doctor Consultation",
        link: "/docConsult",
      },
      {
        id: 3,
        title: "Get Medicines & Medical Supplies Quick and Easy Delivery",
        link: "/medhome",
      },
    ];
    return (
      <div>
        {bookNow.map((book, index) => (
          <div key={index} className="book">
            <p>{book.title}</p>
            <Link to={book.link}>
              <div className="book_now">
                <p>Book Now</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default BookNow;
