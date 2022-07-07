import { createTheme } from "@mui/material";

export default createTheme({
  boxShadows: {
    xs: '1px 1px 2px rgba(100, 100, 100, 0.4)',
    sm: '2px 2px 3px rgba(100, 100, 100, 0.4)',
    md: '3px 3px 4px rgba(100, 100, 100, 0.4)',
    lg: '4px 4px 5px rgba(100, 100, 100, 0.4)',
    xl: '5px 5px 6px rgba(100, 100, 100, 0.4)',
  },
  palette: {
    background: {
      default: "#F8F8F8",
      light: '#F0F2F5',
      dark: '#020202'
    },
    white: {
      main: "#ffffff",
      focus: "#ffffff",
    },
    dark: {
      main: "#344767",
      focus: "#2c3c58",
    },
    primary: {
      main: "#43B8B1",
      state: "#D81B60",
      contrastText: "#FFFFFF"
    },
    gradients: {
      primary: {
        main: "#EC407A",
        state: "#D81B60",
      },
  
      secondary: {
        main: "#747b8a",
        state: "#495361",
      },
  
      info: {
        main: "#49a3f1",
        state: "#1A73E8",
      },
  
      success: {
        main: "#66BB6A",
        state: "#43A047",
      },
  
      warning: {
        main: "#FFA726",
        state: "#FB8C00",
      },
  
      error: {
        main: "#EF5350",
        state: "#E53935",
      },
  
      light: {
        main: "#EBEFF4",
        state: "#CED4DA",
      },
  
      dark: {
        main: "#42424a",
        state: "#191919",
      },
    },
  },
  functions: {
    pxToRem: (number, baseNumber = 16) => `${number / baseNumber}rem`,
    linearGradient: (color, colorState, angle = 195) => `linear-gradient(${angle}deg, ${color}, ${colorState})`
  }
});