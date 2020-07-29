import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import placeholderAvi from "../../img/placeholder-avi.png";
import MyProfilePost from "../layout/MyProfilePost";
import MyProfileInfo from "../layout/MyProfileInfo";
import { getLoggedInPosts } from "../../actions/post";
import Preloader from "../layout/Preloader";
import M from "materialize-css/dist/js/materialize.min.js";
import Modal from "../layout/Modal";

const MyProfile = ({ getLoggedInPosts, isAuthenticated, postLoading, loading, profile, post: {posts} }) => {
  useEffect(() => {
    let tabElems = document.querySelector('.tabs');
    let modalElems = document.querySelectorAll('.modal');
    M.Tabs.init(tabElems, {});
    M.Modal.init(modalElems, {});
    if (!loading && profile.profile !== null) {
      getLoggedInPosts(profile.profile.user);
    }
  }, [loading]);
  
  // if (!isAuthenticated && !loading) {
  //   return <Redirect to="/testhome"/>
  // }
  if (!isAuthenticated) {
    return <Redirect to="/login"/>
  }

  if (loading) {
    return <Preloader/>
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m10 offset-m1">
          <div className="card">
            <MyProfileInfo
              profile={profile.profile}
            />
            <div className="row">
              <div className="col s12">
                <ul className="tabs">
                  <li className="tab col s4">
                    <a href="#tab1">Posts</a>
                  </li>
                  <li className="tab col s4">
                    <a href="#tab2">Media</a>
                  </li>
                  <li className="tab col s4">
                    <a href="#tab3">Likes</a>
                  </li>
                </ul>
              </div>
              <div id="tab1" className="col s12">
                {posts && !postLoading ? posts.map(post => (
                  <MyProfilePost
                    key={post._id}
                    post={post}
                    profile={profile.profile}
                    placeholderAvi={placeholderAvi}
                  />
                )) : <Preloader/>}
              </div>
              <div id="tab2" className="col s12">
                
              </div>
              <div id="tab3" className="col s12">
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-action-btn">
        <Modal profile={profile.profile}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.profile.loading,
  profile: state.profile,
  post: state.post,
  postLoading: state.post.loading
});

export default connect(mapStateToProps, { getLoggedInPosts })(MyProfile)
