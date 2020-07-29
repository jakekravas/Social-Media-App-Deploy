import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { toggleFollow, getProfileByUsername, loadProfile } from "../../actions/profile";

const ProfileInfo = ({ profileToView: { name, username, bio, avatar, cover, followers, following, _id }, toggleFollow, profile, getProfileByUsername, loadProfile }) => {

  let styles = {
    background: `url(${cover ? cover : "#f6f6f6"}) no-repeat center center/cover`,
    height: "180px",
    display: "flex",
    justifyContent: "space-between"
  }

  const onFollow = async () => {
    await toggleFollow(_id);
    getProfileByUsername(username);
    loadProfile();
  }

  return (
    <Fragment>
      <div style={styles}>
        <img className="avi-profile" src={avatar} alt="avatar"/>
        {
          followers.filter(f => f.followGiver === profile.profile._id && f.followReceiver === _id).length === 1 ?
            <button onClick={onFollow} className="btn edit-btn follow-btn">
              <i class="fas fa-user-minus follow-icon"/> Unfollow
            </button>
          :
            <button onClick={onFollow} className="btn edit-btn follow-btn">
              <i class="fas fa-user-plus follow-icon"/> Follow
            </button>
        }
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
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { toggleFollow, getProfileByUsername, loadProfile })(ProfileInfo)
