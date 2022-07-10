import { Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";

const VText = (props) => {

  const { color, children, className, ...rest } = props;

  const colorClass = useMemo(() => {
    switch (color) {
      case "primary": return 'text-gray-400 dark:text-gray-400';
      case "secondary": return 'text-black dark:text-white';
      case "black": return 'text-black';
      case "white": return 'text-white';
      default: return 'text-black dark:text-white';
    }
  }, [color]);

  return <span className={`${colorClass} ${className}`} {...rest}>{children}</span>;

};

VText.defaultProps = {
  color: "secondary",
  className: '',
};

VText.propTypes = {
  color: PropTypes.oneOf(["inherit", "primary", "secondary", "info", "success", "warning", "error", "light", "black", "text", "white"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default VText;