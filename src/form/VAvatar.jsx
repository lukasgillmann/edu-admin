import { forwardRef } from "react";

import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for VAvatar
const VAvatarRoot = styled(Avatar)(({ theme, ownerState }) => {
  const { palette, functions, typography, boxShadows } = theme;
  const { shadow, bgColor, size } = ownerState;

  const { gradients } = palette;
  const { pxToRem, linearGradient } = functions;
  const { fontWeightRegular } = typography;

  // backgroundImage value
  const backgroundValue =
    bgColor === "transparent"
      ? 'transparent'
      : linearGradient(gradients[bgColor].main, gradients[bgColor].state);

  // size value
  let sizeValue;

  switch (size) {
    case "xs":
      sizeValue = {
        width: pxToRem(24),
        height: pxToRem(24),
        fontSize: pxToRem(12),
      };
      break;
    case "sm":
      sizeValue = {
        width: pxToRem(36),
        height: pxToRem(36),
        fontSize: pxToRem(14),
      };
      break;
    case "lg":
      sizeValue = {
        width: pxToRem(58),
        height: pxToRem(58),
        fontSize: pxToRem(18),
      };
      break;
    case "xl":
      sizeValue = {
        width: pxToRem(74),
        height: pxToRem(74),
        fontSize: pxToRem(20),
      };
      break;
    case "xxl":
      sizeValue = {
        width: pxToRem(110),
        height: pxToRem(110),
        fontSize: pxToRem(24),
      };
      break;
    default: {
      sizeValue = {
        width: pxToRem(48),
        height: pxToRem(48),
        fontSize: pxToRem(16),
      };
    }
  }

  return {
    background: backgroundValue,
    color: '#FFFFFF',
    fontWeight: fontWeightRegular,
    boxShadow: boxShadows[shadow],
    ...sizeValue,
  };
});


const VAvatar = forwardRef(({ bgColor, size, shadow, ...rest }, ref) => (
  <VAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
));

// Setting default values for the props of VAvatar
VAvatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
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
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
};

export default VAvatar;
