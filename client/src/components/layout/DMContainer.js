import React from 'react';
import DeleteModal from "./DeleteModal";

const DMContainer = ({ text }) => {
  return (
    <div>
      {text}
      <DeleteModal textt={text}/>
    </div>
  )
}

export default DMContainer;
