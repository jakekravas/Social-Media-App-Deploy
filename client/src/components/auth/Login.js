import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Alert } from "reactstrap";

const Login = ({isAuthenticated, errors, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [displayErr, setDisplayErr] = useState(false);

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
    login(formData);
  }

  if (isAuthenticated) {
    return <Redirect to="/testhome"/>
  }

  return (
    <div className="row auth-content">
      <div className="col s12 m4 offset-m4">
        <div className="card auth-card">
          <form onSubmit={onSubmit} className="card-content">
            {/* <span className="card-title blue-text text-darken-4">Login to your account</span> */}
            <span className="card-title auth-card-title">Login to your account</span>
            {errors && (
              errors.map(err => (
                <Alert className="alert" isOpen={displayErr}>{err.msg}</Alert>
              ))
            )}
            <div className="input-field">
              <input onChange={onChange} type="email" name="email" id="email"/>
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input onChange={onChange} type="password" name="password" id="password"/>
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn waves-effect auth-btn">Login</button>
          </form>
          <div className="card-action auth-card-bottom center-align">
            <Link className="auth-bottom-text" to="/register">Don't have an account? Register here!</Link>
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

export default connect(mapStateToProps, { login })(Login)
