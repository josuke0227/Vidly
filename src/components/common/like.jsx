import React from 'react';

// Input liked: boolean
// Output: onClick

const Like = (props) => {
    let style = !props.liked ? "far" : "fas";
    return ( 
      <i 
      onClick={props.onClick} 
      className={`${style} fa-heart`} 
      style={{ cursor: 'pointer' }}
       />
    );
}

export default Like;