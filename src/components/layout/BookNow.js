import React, { Component } from "react";
import { Link } from "react-router-dom";

// Animation on Scroll
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

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
          <div key={index} className="col-lg-4 col-md-6">
            <div className="home-cards p-4 bg-white shadow-sm rounded-lg my-4"
              data-aos="zoom-in-right" data-aos-duration="1200">
              <div key={index}>
                <Link to={book.link} class="text-decoration-none text-dark ">   
                <div>
                  <img src={book.src} alt="" className="img-fluid" />
                  <div className="home-card-inner my-2">
                    <h6 className="mt-2">{book.title}</h6>
                    <div className="home-card-subtitle">
                      <small>{book.des}</small>
                    </div>
                    <div className="text-center my-2 get-started">
                      <small className="mr-2 mb-2">
                        GET STARTED <i className="fa fa-angle-right fa-lg" aria-hidden="true"></i>
                      </small>
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
