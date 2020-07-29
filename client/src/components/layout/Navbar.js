import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import logo from "../../img/logo5.png"
import { logout } from "../../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ logout, isAuthenticated }) => {
  useEffect(() => {
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
  }, []);

  const guestLinks = (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      {/* <li><Link to="/">Home</Link></li> */}
      {/* <li><Link to="/">About</Link></li> */}
      <li>
        <Link to="/login" className="btn blue darken-1 waves-effect waves-light nav-btn">Login</Link>
      </li>
      <li>
        <Link to="/register" className="btn blue darken-1 waves-effect waves-light nav-btn">Register</Link>
      </li>
    </ul>
  );

  const userLinks = (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to="/feed">Feed</Link></li>
      <li><Link to="/connect">Connect</Link></li>
      <li><Link to="/myprofile">My Profile</Link></li>
      <li>
        <Link onClick={logout} to="/login" className="btn blue darken-1 waves-effect waves-light nav-btn">Logout</Link>
      </li>
    </ul>
  )

  return (
    // <nav className="blue darken-4">
    <nav className="nav-bg">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/testhome" className="brand-logo">
            <img src={logo} alt="logo" id="logo"/>
          </Link>
          <Link to="/" data-target="slide-out" className="button-collapse sidenav-trigger">
            <i className="material-icons">menu</i>
          </Link>
          {isAuthenticated ? userLinks : guestLinks}
          <ul id="slide-out" className="sidenav">
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/connect">Connect</Link></li>
            <li><Link to="/myprofile">My Profile</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar)
