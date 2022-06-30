import { styled, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useAsterController } from "../context";

const VTextRoot = styled(Typography)(({ theme, ownerState }) => {

  const { palette, typography } = theme;
  const { color, textTransform, verticalAlign, fontWeight, opacity, darkMode } = ownerState;

  const { white } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;

  const fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  let colorValue = color === 'inherite' || !palette[color] ? 'inherite' : palette[color].main;

  if (darkMode && (color === 'inherite' || !palette[color])) {
    colorValue = 'inherite';
  } else if (darkMode && color === 'dark') {
    colorValue = white.main;
  }

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: 'none',
    color: colorValue,
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight]
  };
});

const VText = forwardRef(
  ({
    color, fontWeight, textTransform, verticalAlign, opacity, children, ...rest
  }, ref) => {
    const [controller] = useAsterController();
    const { darkMode } = controller;

    return <>
      <VTextRoot
        {...rest}
        ref={ref}
        ownerState={{ color, fontWeight, textTransform, verticalAlign, opacity, darkMode }}
      >
        {children}
      </VTextRoot>
    </>;
  }
);

VText.defaultProps = {
  color: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  opacity: 1,
};

VText.propTypes = {
  color: PropTypes.oneOf(["inherit", "primary", "secondary", "info", "success", "warning", "error", "light", "dark", "text", "white"]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf(["unset", "baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom"]),
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
};

export default VText;