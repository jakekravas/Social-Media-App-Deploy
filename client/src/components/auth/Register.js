import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { Alert } from "reactstrap";

const Register = ({ isAuthenticated, errors, register }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  });

  const { email, password, password2 } = formData;

  const [displayErr, setDisplayErr] = useState(false);
  const [pwMismatchErr, setPwMismatchErr] = useState(false);

  useEffect(() => {
    if (errors) {
      setDisplayErr(true);
      setTimeout(() => {{ setDisplayErr(false) }}, 3000);
    }
  }, [errors]);

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = e => {
    e.preventDefault();

    // if (password !== password2) {
    //   setPwMismatchErr(true);
    //   setTimeout(() => {{ setPwMismatchErr(false) }}, 3000);
    // } else {
    //   register(email, password);
    // }
    register(email, password, password2);
  }

  if (isAuthenticated) {
    return <Redirect to="createprofile"/>
  }

  return (
    <div className="row auth-content">
      <div className="col s12 m4 offset-m4">
        <div className="card auth-card">
          <form onSubmit={onSubmit} className="card-content">
            <span className="card-title auth-card-title">Create an account</span>
            {errors && (
              errors.map(err => (
                <Alert className="alert" isOpen={displayErr}>{err.msg}</Alert>
              ))
            )}
            {/* <Alert className="alert" isOpen={pwMismatchErr}>Passwords do not match</Alert> */}
            <div className="input-field">
              <input onChange={onChange} type="email" name="email" id="email"/>
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input onChange={onChange} type="password" name="password" id="password"/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field">
              <input onChange={onChange} type="password" name="password2" id="password"/>
              <label htmlFor="password">Confirm Password</label>
            </div>
            <button className="btn waves-effect auth-btn">Sign Up</button>
          </form>
          <div className="card-action auth-card-bottom center-align">
            <Link className="auth-bottom-text" to="/login">Already have an account? Login here!</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors
})

export default connect(mapStateToProps, {register})(Register)
