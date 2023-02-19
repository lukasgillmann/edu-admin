import React from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";

const VText = (props) => {

  const { color, children, className, div, ...rest } = props;

  const colorClass = useMemo(() => {
    switch (color) {
      case "primary": return 'text-black dark:text-white';
      case "secondary": return 'bg-gray';
      case "black": return 'text-black';
      case "white": return 'text-white';
      case "custom": return '';
      default: return 'text-black dark:text-white';
    }
  }, [color]);

  return div ?
    <div className={`${colorClass} ${className} m-0`} {...rest}>{children}</div>
    :
    <span className={`${colorClass} ${className} m-0`} {...rest}>{children}</span>;

};

VText.defaultProps = {
  color: "primary",
  className: '',
  div: false,
};

VText.propTypes = {
  color: PropTypes.oneOf(["inherit", "primary", "secondary", "info", "success", "warning", "error", "light", "black", "text", "white", "custom"]),
  children: PropTypes.node,
  className: PropTypes.string,
  div: PropTypes.bool
};

export default VText;