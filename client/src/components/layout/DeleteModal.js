import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deletePost } from "../../actions/post";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

const DeleteModal = ({ textt, deletePost }) => {
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

  const onDelete = () => {
    console.log(textt);
    // deletePost(postId);
  }

  const submitStyle = {
    marginLeft: "10px"
  };

  return (
    <div>
      <span className="modal-trigger" data-target="modal2"><i class="far fa-trash-alt pointer"/></span>

      <div
        ref={Modal => {Modal = Modal;}}
        id="modal2"
        className="modal delete-modal"
      >
        {/* If you want Bottom Sheet Modal then add 
                      bottom-sheet class to the "modal" div
                      If you want Fixed Footer Modal then add
                      modal-fixed-footer to the "modal" div*/}
        <div className="modal-content center-align">
          <i style={{fontSize: "50px"}} class="fas fa-ban red-text"/>
          <br/>
          <h5 className="flow-text">Are you sure you want to delete this post?</h5>
        </div>
        <div className="modal-footer dm-footer">
          <a className="modal-close btn-flat">
            Cancel
          </a>
          <button style={submitStyle} onClick={onDelete} className="btn red modal-close">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { deletePost })(DeleteModal);