import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { toggleLikePost } from "../../actions/post"
import { getPostsByUsername } from "../../actions/post";

const ProfilePost = ({ profile: {profile: {user}}, post: { _id, text, name, username, avatar, likes, date }, toggleLikePost, getPostsByUsername }) => {

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes.filter(l => l.user === user).length === 1) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes]);

  const onLike = async () => {
    await toggleLikePost(_id);
    getPostsByUsername(username);
    setLiked(!liked);
  }

  return (
    <div className="post-container">
      <div>
        <img className="avi-post" src={avatar} alt="avatar"/>
      </div>
      <div className="post-content">
        <div className="post-user-container">
          <p className="bold-text m-0">{name}</p>&nbsp;&nbsp;
          <p className="grey-text text-darken-1 m-0">@{username}</p>
          &nbsp;<span className="grey-text text-darken-1">&middot;</span>&nbsp;
          <p className="grey-text text-darken-1 m-0">2h</p>
          <i class="fas fa-angle-down grey-text text-darken-1"/>
        </div>
        <div className="post-text-container">
          <p className="m-0">{text}</p>
        </div>
        <div className="post-actions-container grey-text text-darken-2">
          <span><i class="far fa-comment pointer"/></span>
          <span onClick={onLike}>
            {likes.length > 0 && likes.length}&nbsp;
            <i class={!liked ? "far fa-thumbs-up pointer" : "fas fa-thumbs-up pointer"}/>
          </span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { toggleLikePost, getPostsByUsername })(ProfilePost)
