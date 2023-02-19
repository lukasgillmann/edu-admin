import { forwardRef } from "react";

import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for VAvatar
const VAvatarRoot = styled(Avatar)(({ theme, ownerState }) => {
  const { typography } = theme;
  const { size } = ownerState;

  const { fontWeightRegular } = typography;

  // backgroundImage value
  const backgroundValue = '#F5F5F5'

  // size value
  let sizeValue;

  switch (size) {
    case "xs":
      sizeValue = {
        width: 24,
        height: 24,
        fontSize: 12,
      };
      break;
    case "sm":
      sizeValue = {
        width: 36,
        height: 36,
        fontSize: 14,
      };
      break;
    case "lg":
      sizeValue = {
        width: 58,
        height: 58,
        fontSize: 18,
      };
      break;
    case "xl":
      sizeValue = {
        width: 74,
        height: 74,
        fontSize: 20,
      };
      break;
    case "xxl":
      sizeValue = {
        width: 110,
        height: 110,
        fontSize: 24,
      };
      break;
    default: {
      sizeValue = {
        width: 48,
        height: 48,
        fontSize: 16,
      };
    }
  }

  return {
    background: backgroundValue,
    color: '#FFFFFF',
    fontWeight: fontWeightRegular,
    ...sizeValue,
  };
});


const VAvatar = forwardRef(({ bgColor, size, ...rest }, ref) => (
  <VAvatarRoot ref={ref} ownerState={{ bgColor, size }} {...rest} />
));

// Setting default values for the props of VAvatar
VAvatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
};

// Typechecking props for the VAvatar
VAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
};

export default VAvatar;
