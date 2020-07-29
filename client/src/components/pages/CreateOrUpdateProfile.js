import React from 'react';
import { connect } from "react-redux";

const CreateOrUpdateProfile = ({ profile }) => {
  return (
    <div className="container">
      <h3>Create Your Profile</h3>
      <h5> <i className="fas fa-user"/> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, quasi!</h5>
      <div className="input-field">
        <input type="text" placeholder="Name"/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {})(CreateOrUpdateProfile)
