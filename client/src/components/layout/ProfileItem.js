import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleFollow, loadProfile } from "../../actions/profile";

const ProfileItem = ({ profile: {_id, name, username, avatar, bio}, toggleFollow, loadProfile }) => {
  const [following, setFollowing] = useState(false);

  const onFollow = async () => {
    await toggleFollow(_id);
    loadProfile();
    setFollowing(!following);
  }

  return (
    <div className="post-container">
      <div>
        <Link to={`/profile/${username}`}>
          <img className="avi-post" src={avatar} alt="avatar"/>
        </Link>
      </div>
      <div className="post-content">
        <div className="post-user-container">
          <Link to={`/profile/${username}`}>
            <p className="bold-text m-0">{name}</p>
          </Link>&nbsp;
          <Link to={`/profile/${username}`}>
            <p className="grey-text text-darken-1 m-0 un-md">@{username}</p>
          </Link>
        </div>
        <div className="list-profile-container">
          <Link to={`/profile/${username}`}>
            <p className="grey-text text-darken-1 m-0 un-sm">@{username}</p>
          </Link>
          <p className="m-0 list-bio">{bio && bio}</p>
        </div>
      </div>
        {
          !following ?
          <button onClick={onFollow} style={{marginLeft: "auto"}} className="btn blue darken-4">Follow</button>
          :
          <button onClick={onFollow} style={{marginLeft: "auto"}} className="btn white blue-text text-darken-4">Unfollow</button>
        }
    </div>
  )
}

export default connect(null, { toggleFollow, loadProfile })(ProfileItem)
