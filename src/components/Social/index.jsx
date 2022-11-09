import React from "react";
import "./social.css";

const Social = ({ url, children }) => {
  return (
    <a href={url} className='social' rel='noopener noreferrer' target='_blank'>
      {children}
    </a>
  );
};

export default Social;
