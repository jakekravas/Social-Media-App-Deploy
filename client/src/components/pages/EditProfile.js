import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/profile";
import loader from "../../img/loading-gif.gif";
import {cdl, cdld} from "../../utils/cdl2";
import { Alert } from "reactstrap";

// todo - start this
const EditProfile = ({profile: {profile, loading}, errors, updateProfile }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    avatar: ""
  });
  const { name, username, bio, avatar } = formData;

  const [aviLoading, setAviLoading] = useState(false);
  const [displayErr, setDisplayErr] = useState(false);

  useEffect(() => {
    if (errors) {
      setDisplayErr(true);
      setTimeout(() => {{ setDisplayErr(false) }}, 3000);
    }
  }, [errors]);

  if (!loading) {
    setFormData({});
  }

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const photoChange = async e => {
    if (e.target.files.length < 1) {
      setFormData({...formData, avatar: cdl});
    } else {
      setAviLoading(true);
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "photos");
      const res = await fetch(
        cdld,
        {
          method: "POST",
          body: data
        }
      );
        const file = await res.json();
      setFormData({...formData, avatar: file.secure_url});
      setAviLoading(false);
    }
  }
  
  const removeAvatar = e => {
    e.preventDefault();
    setAviLoading(true);
    setFormData({...formData, avatar: cdl});
    setAviLoading(false);
  }

  const onSubmit = e => {
    e.preventDefault();
    updateProfile(name, username, bio, avatar);
  }

  // if (profile) {
  //   return <Redirect to="/testhome"/>
  // }

  return (
    <div className="container">
      <div className="row auth-content">
        <div className="col s12 m8 offset-m2">
          <div className="card auth-card">
            <form onSubmit={onSubmit} className="card-content">
              {errors && (
                errors.map(err => (
                  <Alert className="alert" isOpen={displayErr}>{err.msg}</Alert>
                ))
              )}
              <span className="card-title prim-text">Create Your Profile</span>
                <img className="avi-update" src={aviLoading ? loader : avatar} alt="avatar"/>
                <div className="input-field">
                  <input
                    type="file"
                    name="myfile"
                    onChange={photoChange}
                  />
                </div>
                {avatar !== cdld && !aviLoading && <button onClick={removeAvatar}>Remove Avatar</button>}
              <div className="input-field">
                <input onChange={onChange} type="text" name="name" id="name"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field">
                <input onChange={onChange} type="text" name="username" id="username"/>
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field">
                <textarea onChange={onChange} id="bio" name="bio" className="materialize-textarea mta"/>
                <label htmlFor="bio">Bio</label>
              </div>
              <button className="btn waves-effect auth-btn">Create Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  errors: state.profile.errors
});

export default connect(mapStateToProps, { updateProfile })(EditProfile)
