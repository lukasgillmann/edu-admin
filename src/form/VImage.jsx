import React from "react";

const VImage = (props) => {

  const {
    error,
    ...rest
  } = props;

  return <img
    onError={({ currentTarget }) => {
      currentTarget.onerror = null;
      if (error === 'user') currentTarget.src = '/assets/avatar.png';
      else if (error === 'course') currentTarget.src = '/assets/course.png';
      else if (error === 'cover') currentTarget.src = '/assets/cover.png';
      else currentTarget.style.display = 'none';
    }}
    {...rest}
    alt=''
  />;
};

VImage.defaultProps = {
  error: '', // user | course
};

export default VImage;