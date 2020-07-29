import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import loadingGif from "../../img/loading-gif.gif";

const TestHome = ({profile, loading, isAuthenticated}) => {
  if (!loading && isAuthenticated && profile.profile === null) {
    return <Redirect to="/createprofile"/>
  }

  if (!loading && isAuthenticated && profile.profile !== null) {
    return <Redirect to="/feed"/>
  }

  if (isAuthenticated === null) {
    return <Redirect to="/login"/>
  }

  return (
    <div>
      <img src={loadingGif} alt="loading"/>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.profile.loading,
  profile: state.profile
});

export default connect(mapStateToProps, {})(TestHome)
