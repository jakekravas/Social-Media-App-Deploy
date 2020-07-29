import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleLikePost, getFollowingPosts } from "../../actions/post"

const FeedPost = ({ post: {name, username, avatar, text, likes, date, _id},
  profile: {profile, loading}, toggleLikePost, getFollowingPosts }) => {
  
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes.filter(like => like.user === profile.user).length === 1) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes]);

  const onLike = async () => {
    toggleLikePost(_id);
    getFollowingPosts();
  }

  return (
    <div className="post-container">
      <Link to={`/profile/${username}`}>
        <img className="avi-post" src={avatar} alt="avatar"/>
      </Link>
      <div className="post-content">
        <div className="post-user-container">
          <Link className="bold-text m-0" to={`/profile/${username}`}>{name}</Link>&nbsp;&nbsp;
          <Link className="grey-text text-darken-1 m-0" to={`/profile/${username}`}>@{username}</Link>
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

export default connect(mapStateToProps, { toggleLikePost, getFollowingPosts })(FeedPost)
