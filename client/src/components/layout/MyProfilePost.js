import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { toggleLikePost, getLoggedInPosts, deletePost } from "../../actions/post";
import M from "materialize-css/dist/js/materialize.min.js";

const MyProfilePost = ({ post: {_id, text, likes}, placeholderAvi, profile: {name, username, avatar, user}, toggleLikePost, getLoggedInPosts, deletePost}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});

    if (likes.filter(l => l.user === user).length === 1) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes]);

  const onLike = async () => {
    await toggleLikePost(_id);
    getLoggedInPosts(user);
  }
  
  const onDelete = async () => {
    await deletePost(_id)
    getLoggedInPosts(user);
  }

  const commentOpen = () => {

  }

  return (
    <div className="post-container">
      <div>
        <img className="avi-post" src={avatar ? avatar : placeholderAvi} alt="avatar"/>
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
          {/* <span><i class="far fa-clock"/> 12/25/1997</span> */}
          <span onClick={commentOpen}><i class="far fa-comment pointer"/></span>
          <span onClick={onLike}>
            {likes.length > 0 && likes.length}&nbsp;
            <i class={!liked ? "far fa-thumbs-up pointer" : "fas fa-thumbs-up pointer"}/>
          </span>
          <span onClick={onDelete}><i class="far fa-trash-alt pointer"/></span>
          {/* <DeleteModal postId={_id}/> */}
        </div>
      </div>
    </div>
  )
}

export default connect(null, { toggleLikePost, getLoggedInPosts, deletePost })(MyProfilePost)
