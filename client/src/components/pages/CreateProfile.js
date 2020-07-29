import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import loader from "../../img/loading-gif.gif";
import {cdl, cdld} from "../../utils/cdl2";
import { Alert } from "reactstrap";

const CreateProfile = ({profile, errors, createProfile, auth }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    avatar: cdld,
    // avatar: "https://res.cloudinary.com/dyyumq7yz/image/upload/v1594520134/photos/p8fhuove0artibtnm2oc.png",
    cover: ""
  });
  const { name, username, bio, avatar, cover } = formData;

  const [aviLoading, setAviLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);
  const [displayErr, setDisplayErr] = useState(false);

  let editStyles = {
    background: `url(${coverLoading ? loader : cover}) no-repeat center center/cover`,
    // background: `${cover ? `${cover} no-repeat center center/cover` : "#f6f6f6"}`,
    height: "180px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px"
  }

  useEffect(() => {
    if (errors) {
      setDisplayErr(true);
      setTimeout(() => {{ setDisplayErr(false) }}, 3000);
    }
  }, [errors]);

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const coverChange = async e => {
    if (e.target.files.length < 1) {
      setFormData({...formData, cover: ""});
    } else {
      setCoverLoading(true);
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "photos");
      const res = await fetch(
        cdl,
        // "https://api.cloudinary.com/v1_1/dyyumq7yz/image/upload",
        {
          method: "POST",
          body: data
        }
      );
      const file = await res.json();
      setFormData({...formData, cover: file.secure_url});
      setCoverLoading(false);
    }
  }

  const photoChange = async e => {
    if (e.target.files.length < 1) {
      setFormData({...formData, avatar: cdld});
      // setFormData({...formData, avatar: "https://res.cloudinary.com/dyyumq7yz/image/upload/v1594520134/photos/p8fhuove0artibtnm2oc.png"});
    } else {
      setAviLoading(true);
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "photos");
      const res = await fetch(
        cdl,
        // "https://api.cloudinary.com/v1_1/dyyumq7yz/image/upload",
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
    setFormData({...formData, avatar: cdld});
    // setFormData({...formData, avatar: "https://res.cloudinary.com/dyyumq7yz/image/upload/v1594520134/photos/p8fhuove0artibtnm2oc.png"});
    setAviLoading(false);
  }

  const removeCover = e => {
    e.preventDefault();
    setCoverLoading(true);
    setFormData({...formData, cover: ""});
    setCoverLoading(false);
  }

  const onSubmit = e => {
    e.preventDefault();
    createProfile(name, username, bio, avatar, cover);
  }

  if (!auth.isAuthenticated) {
    return <Redirect to="/login"/>
  }

  if (profile) {
    return <Redirect to="/myprofile"/>
  }

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
              <div style={editStyles}/>
              <div class="file-field input-field">
                <div class="btn blue darken-4">
                  <span>Add Cover Photo</span>
                  <input onChange={coverChange} type="file"/>
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text"/>
                </div>
              </div>
                {cover && !coverLoading && <button onClick={removeCover} style={{marginBottom: "10px"}} className="btn red darken-1">Remove Cover Photo</button>}
                <div>
                  <img className="avi-update" src={aviLoading ? loader : avatar} alt="avatar"/>
                </div>
                <div class="file-field input-field">
                  <div class="btn blue darken-4">
                    <span>Add Avatar</span>
                    <input onChange={photoChange} type="file"/>
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text"/>
                  </div>
                </div>
                {avatar !== "https://res.cloudinary.com/dyyumq7yz/image/upload/v1594520134/photos/p8fhuove0artibtnm2oc.png" && !aviLoading && <button onClick={removeAvatar} className="btn red darken-1">Remove Avatar</button>}
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
  auth: state.auth,
  profile: state.profile.profile,
  errors: state.profile.errors,
});

export default connect(mapStateToProps, { createProfile })(CreateProfile)
