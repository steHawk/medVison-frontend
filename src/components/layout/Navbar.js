import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";

import PropTypes from "prop-types";

// class Navbar extends Component {
//   static propTypes = {
//     auth: PropTypes.object.isRequired,
//     logout: PropTypes.func.isRequired,
//   };

//   render() {
//     const { isAuthenticated } = this.props.auth;
//     function handleBlur(e) {
//       document.querySelector('.main-menu').classList.toggle('show');
//     }

//     return (
//       <div className="main-nav">
//         <ul className="main-menu" >
//           <li>   <div ><div className="close-i">

//             <i className="fa fa-times fa-3x" aria-hidden="true"></i>
//           </div>   </div>
//           </li>
//           <li><Link to="/doctors" >Doctor Consultation</Link></li>
//           <li> <Link to="/alltests" >Lab Services</Link></li>
//           <li> <Link to="/meditems" > Medicines and Medical Supplies</Link></li>

//           {isAuthenticated ? (
//             <div className="right">
//               <li> <Link to="/profile" ><i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
//                            Profile</Link></li>
//               <li> <Link to="/" onClick={() => { handleBlur(); this.props.logout()}}><i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
//                            Logout</Link>
//               </li>
//               <li> <Link to="/cart" ><i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
//                            Cart</Link></li>
//             </div>

//           ) : (
//               <div className="right">
//                 <li> <Link to="/login" ><i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
//                           Profile</Link></li>
//                 <li> <Link to="/login" ><i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
//                           Login</Link>
//                 </li>
//                 <li> <Link to="/login" ><i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
//                           Cart</Link></li>
//               </div>

//             )}

//         </ul>

//       </div>
//     );
//   }
// }
// class Navbar extends Component {
//   static propTypes = {
//     auth: PropTypes.object.isRequired,
//     logout: PropTypes.func.isRequired,
//   };

//   render() {
//     const { isAuthenticated } = this.props.auth;
//     function handleBlur(e) {
//       document.querySelector(".main-menu").classList.toggle("show");
//     }

//     return (
//       <div className="main-nav">
//         <ul className="main-menu">
//           <li>
//             {" "}
//             <div >
//               <div className="close-i">
//                 <i className="fa fa-times fa-2x" aria-hidden="true"></i>
//               </div>{" "}
//             </div>
//           </li>
//           <li>
//             <Link to="/doctors" >
//               Doctor Consultation
//             </Link>
//           </li>
//           <li>
//             {" "}
//             <Link to="/alltests" >
//               Lab Services
//             </Link>
//           </li>
//           <li>
//             {" "}
//             <Link to="/meditems" >
//               {" "}
//               Medicines and Medical Supplies
//             </Link>
//           </li>
//           {isAuthenticated ? (
//             <ul>
//               <li>
//                 {" "}
//                 <Link to="/profile" >
//                   <i
//                     className="fa fa-user-circle-o fa-2x"
//                     aria-hidden="true"
//                   ></i>
//                 </Link>
//               </li>
//               <li>
//                 {" "}
//                 <Link
//                   to="/"
//                   onClick={() => {
//                     handleBlur();
//                     this.props.logout();
//                   }}
//                 >
//                   <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
//                 </Link>
//               </li>
//               <li>
//                 {" "}
//                 <Link to="/cart" >
//                   <i
//                     className="fa fa-shopping-cart fa-2x"
//                     aria-hidden="true"
//                   ></i>
//                 </Link>
//               </li>
//             </ul>
//           ) : (
//             <ul>
//               <li>
//                 {" "}
//                 <Link to="/login" >
//                   <i
//                     className="fa fa-user-circle-o fa-2x"
//                     aria-hidden="true"
//                   ></i>
//                 </Link>
//               </li>
//               <li>
//                 {" "}
//                 <Link to="/login" >
//                   <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
//                 </Link>
//               </li>
//               <li>
//                 {" "}
//                 <Link to="/login" >
//                   <i
//                     className="fa fa-shopping-cart fa-2x"
//                     aria-hidden="true"
//                   ></i>
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </ul>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });
// export default connect(mapStateToProps, { logout })(Navbar);














const Navbar = ({ auth, logout }) => {

  const { isAuthenticated } = auth;
  return (
    <div className="main-nav">
      <ul className="main-menu">
        <li>
          <Link to="/doctors" >
            Doctor Consultation
          </Link>
        </li>
        <li>
          <Link to="/alltests" >
            Lab Services
          </Link>
        </li>
        <li>
          <Link to="/meditems" >
            Medicines and Medical Supplies
          </Link>
        </li>
        {isAuthenticated ? (
          <ul>
            <li>
              <Link to="/profile" >
                <i
                  className="fa fa-user-circle-o fa-2x"
                  aria-hidden="true"
                ></i>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
              </Link>
            </li>
            <li>
              <Link to="/cart" >
                <i
                  className="fa fa-shopping-cart fa-2x"
                  aria-hidden="true"
                ></i>
              </Link>
            </li>
          </ul>
        ) : (
            <ul>
              <li>
                <Link to="/login" >
                  <i
                    className="fa fa-user-circle-o fa-2x"
                    aria-hidden="true"
                  ></i>
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/login" >
                  <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/login" >
                  <i
                    className="fa fa-shopping-cart fa-2x"
                    aria-hidden="true"
                  ></i>
                </Link>
              </li>
            </ul>
          )}
      </ul>
    </div>
  );

}
export default Navbar;