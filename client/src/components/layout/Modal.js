import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createPost, getLoggedInPosts } from "../../actions/post";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

const Modal = ({ createPost, getLoggedInPosts, profile: {user} }) => {
  useEffect(() => {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }, []);

  const [postText, setPostText] = useState("");
  const [postDisable, setPostDisable] = useState(true);

  const onChange = e => {
    // Setting postText to whatever's currently in the field
    setPostText(e.target.value);

    if (e.target.value) {
      // Enabling post button if field is not blank
      setPostDisable(false);
    } else {
      // Disabling post button if field is blank
      setPostDisable(true);
    }
  }
  const submitPost = async e => {
    e.preventDefault();
    // Calling createPost action
    await createPost(postText);
    getLoggedInPosts(user);
  }

  const submitStyle = {
    marginLeft: "10px"
  };

  return (
    <div>
      <a
        className="btn btn-floating btn-large blue modal-trigger"
        data-target="modal1"
      >
        <i className="material-icons">add</i>
      </a>

      <div
        ref={Modal => {Modal = Modal;}}
        id="modal1"
        className="modal"
      >
        {/* If you want Bottom Sheet Modal then add 
                      bottom-sheet class to the "modal" div
                      If you want Fixed Footer Modal then add
                      modal-fixed-footer to the "modal" div*/}
        <div className="modal-content">
          <h4>Create A Post</h4>
          <div className="input-field">
              <textarea onChange={onChange} name="post" className="materialize-textarea mta"/>
              <label htmlFor="post">Post</label>
            </div>
        </div>
        <div className="modal-footer">
          <a className="modal-close btn-flat">
            Cancel
          </a>
          <button style={submitStyle} id="sp-btn" onClick={submitPost} disabled={postDisable} className="btn blue modal-close">Submit Post</button>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { createPost, getLoggedInPosts })(Modal);