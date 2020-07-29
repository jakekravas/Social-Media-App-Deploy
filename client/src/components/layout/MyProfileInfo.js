import React, { useEffect, useState, Fragment } from 'react';
import { connect } from "react-redux";
import { updateProfile } from "../../actions/profile";
import loader from "../../img/loading-gif.gif";
import { Alert } from "reactstrap";

const MyProfileInfo = ({ updateProfile, errors, profile: {name, username, bio, avatar, cover, followers, following}}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [aviLoading, setAviLoading] = useState(false);
  const [displayErr, setDisplayErr] = useState(false);
  const [displaySaved, setDisplaySaved] = useState(false);
  const [load, setLoad] = useState(true);

  const [formData, setFormData] = useState({
    formName: name,
    formUsername: username,
    formBio: bio,
    formAvatar: avatar,
    formCover: cover
  });
  const { formName, formUsername, formBio, formAvatar, formCover } = formData;

  let styles = {
    background: `url(${formCover ? formCover : "#f6f6f6"}) no-repeat center center/cover`,
    height: "180px",
    display: "flex",
    justifyContent: "space-between"
  }
  let editStyles = {
    background: `url(${formCover ? formCover : "#f6f6f6"}) no-repeat center center/cover`,
    height: "180px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px"
  }

  let aviEditStyle = {
    marginTop: "10px",
  }

  useEffect(() => {
    if (!load) {
      if (errors) {
        setDisplayErr(true);
        setTimeout(() => {{ setDisplayErr(false) }}, 3000);
      } else {
        setDisplaySaved(true);
        setTimeout(() => {{ setDisplaySaved(false) }}, 3000);
      }
    }
  }, [errors, load]);

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  }

  const test = async () => {
    if (errors === null) {
      console.log("NO ERRORS");
    } else {
      console.log("ERRORS");
    }
  }
  
  const onUpdate = async e => {
    e.preventDefault();
    setLoad(true);
    await updateProfile(formName, formUsername, formBio, formAvatar, formCover);
    await test();
    setLoad(false);
  }

  const removeAvatar = e => {
    e.preventDefault();
    setAviLoading(true);
    setFormData({...formData, formAvatar: "https://res.cloudinary.com/dyyumq7yz/image/upload/v1594520134/photos/p8fhuove0artibtnm2oc.png"});
    setAviLoading(false);
  }

  const removeCover = e => {
    e.preventDefault();
    setFormData({...formData, formCover: ""});
  }

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const coverChange = async e => {
    if (e.target.files.length < 1) {
      setFormData({...formData, formCover: "https://res.cloudinary.com/dyyumq7yz/image/upload/v1594520134/photos/p8fhuove0artibtnm2oc.png"});
    } else {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "photos");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyyumq7yz/image/upload",
        { method: "POST", body: data }
      );
      const file = await res.json();
      setFormData({...formData, formCover: file.secure_url});
    }
  }

  const photoChange = async e => {
    if (e.target.files.length < 1) {
      setFormData({...formData, formAvatar: "https://res.cloudinary.com/dyyumq7yz/image/upload/v1594520134/photos/p8fhuove0artibtnm2oc.png"});
    } else {
      setAviLoading(true);
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "photos");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyyumq7yz/image/upload",
        { method: "POST", body: data }
      );
      const file = await res.json();
      setFormData({...formData, formAvatar: file.secure_url});
      setAviLoading(false);
    }
  }

  if (!showEdit) {
    return (
      <Fragment>
        <div style={styles}>
          <img className="avi-profile" src={avatar} alt="avatar"/>
          <button onClick={toggleEdit} className="btn blue edit-btn">Edit</button>
        </div>
        <div className="card-content profile-content">
          <span className="card-title profile-name">{name}</span>
          <h6 className="profile-username grey-text text-darken-1">@{username}</h6>
          <p className="profile-bio">{bio && bio}</p>
          <p className="profile-ff">
          <span className="bold-text">{followers.length}</span>
            &nbsp;<span className="grey-text text-darken-2">Followers</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="bold-text">{following.length}</span>
            &nbsp;<span className="grey-text text-darken-2">Following</span>
          </p>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div style={editStyles}/>
        <div style={{paddingLeft: "24px", paddingRight: "24px", margin: "0"}} className="file-field input-field">
          <div class="btn blue darken-4">
            <span>Change Cover</span>
            <input onChange={coverChange} type="file"/>
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text"/>
          </div>
        </div>
          { formCover &&
            <button onClick={removeCover} className="btn white blue-text text-darken-4 rmv-cover-btn">Remove Cover</button>
          }
        <div>
          <img style={aviEditStyle} className="avi-profile" src={aviLoading ? loader : formAvatar} alt="avatar"/>
        </div>
        <div style={{paddingTop: 0, marginTop: 0}} className="card-content profile-content">
          <div class="file-field input-field">
            <div>
              <div class="btn blue darken-4">
                <span>Change Avatar</span>
                <input onChange={photoChange} type="file"/>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text"/>
              </div>
            </div>
          </div>
          {
            avatar !== "https://res.cloudinary.com/dyyumq7yz/image/upload/v1594520134/photos/p8fhuove0artibtnm2oc.png"
            &&
            <button onClick={removeAvatar} className="btn red darken-1">Remove Avatar</button>
          }
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={formName}
              name="formName"
              onChange={onChange}
            />
          </div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={formUsername}
            name="formUsername"
            onChange={onChange}
          />
          <label htmlFor="bio">Bio</label>
          <textarea
            onChange={onChange}
            name="formBio"
            value={formBio}
            className="materialize-textarea mta"
          />
          <div>
            <button style={{marginTop: 0}} onClick={toggleEdit} className="btn white blue-text text-darken-4 cancel-btn">Cancel</button>
            <button style={{marginTop: 0}} onClick={onUpdate} className="btn blue darken-4 edit-btn">Save</button>
          </div>
          {errors ? (
            errors.map(err => (
              <Alert className="alert ud" isOpen={displayErr}>{err.msg}</Alert>
            ))
          ) : <Alert className="alert-saved ud" isOpen={displaySaved}>
                <i class="fas fa-check-circle"/> Profile Saved
              </Alert>}
          {/* <p className="profile-ff">
            <span className="bold-text">124</span>
            &nbsp;<span className="grey-text text-darken-2">Followers</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="bold-text">124</span>
            &nbsp;<span className="grey-text text-darken-2">Following</span>
          </p> */}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.profile.errors
});

export default connect(mapStateToProps, { updateProfile })(MyProfileInfo)
