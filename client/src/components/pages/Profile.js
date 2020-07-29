import React, { useEffect, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileByUsername, loadProfile } from "../../actions/profile";
import { getPostsByUsername } from "../../actions/post";
import ProfileInfo from "../layout/ProfileInfo";
import ProfilePost from "../layout/ProfilePost";
import Preloader from "../layout/Preloader";
import M from "materialize-css/dist/js/materialize.min.js"

const Profile = ({ match, auth, getProfileByUsername, getPostsByUsername, profile: {profileToView, loading, profile}, post: {postsToView}, postLoading, loadProfile }) => {

  useEffect(() => {
    getProfileByUsername(match.params.id);
    getPostsByUsername(match.params.id);
    if (profile === null) {
      loadProfile();
    }
    let tabElems = document.querySelector('.tabs');
    let modalElems = document.querySelectorAll('.modal');
    M.Tabs.init(tabElems, {});
    M.Modal.init(modalElems, {});
  }, [match.params.username]);

  if (!auth.isAuthenticated) {
    return <Redirect to="/login"/>
  }

  return (
    <Fragment>
      {loading || profileToView === null || profile === null ? <span>Loading...</span> : 
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1">
            <div className="card">
              <ProfileInfo
                profileToView={profileToView}
                profile={profile}
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
                  {postsToView && !postLoading ? postsToView.map(post => (
                    // <p>{post.text}</p>
                    <ProfilePost
                      key={post._id}
                      post={post}
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
          
        </div>
      </div>
      }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
  postLoading: state.post.loading
})

export default connect(mapStateToProps, { getProfileByUsername, getPostsByUsername, loadProfile })(Profile)
