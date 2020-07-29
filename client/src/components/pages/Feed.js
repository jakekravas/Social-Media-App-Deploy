import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getFollowingPosts } from "../../actions/post";
import FeedPost from "../layout/FeedPost";

const Feed = ({ post: { postsOfFollowing, loading }, getFollowingPosts }) => {
  useEffect(() => {
    getFollowingPosts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m10 offset-m1">
          <div className="card" id="feed-card">
            <span className="card-title" id="feed-header">Your Feed</span>
            <div className="card-content card-content-pf-list">
              {!loading && postsOfFollowing &&
                postsOfFollowing.map(post => (
                  <FeedPost post={post}/>
                ))
              }
              {/* {!loading && postsOfFollowing.length === 0 && */}
              {!loading && postsOfFollowing === null &&
                <h4>Your feed is empty</h4>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getFollowingPosts })(Feed)
