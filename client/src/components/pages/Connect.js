import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ProfileItem from "../layout/ProfileItem"
import { getAllProfiles } from "../../actions/profile";

const Connect = ({ profile: {profiles, loading}, getAllProfiles, isAuthenticated }) => {
  useEffect(() => {
    getAllProfiles();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/login"/>
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m10 offset-m1">
          <div className="card" id="connect-card">
            <span className="card-title" id="connect-header">People to follow</span>
            <div className="card-content card-content-pf-list">
              {!loading && profiles &&
                profiles.map(profile => (
                  <ProfileItem profile={profile}/>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Connect)
