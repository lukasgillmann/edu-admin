import { createTheme } from "@mui/material";
import colors from "./base/colors";
import card from "./components/card";

export default createTheme({
  boxShadows: {
    xs: '1px 1px 2px rgba(100, 100, 100, 0.4)',
    sm: '2px 2px 3px rgba(100, 100, 100, 0.4)',
    md: '3px 3px 4px rgba(100, 100, 100, 0.4)',
    lg: '4px 4px 5px rgba(100, 100, 100, 0.4)',
    xl: '5px 5px 6px rgba(100, 100, 100, 0.4)',
  },
  palette: {...colors},
  functions: {
    pxToRem: (number, baseNumber = 16) => `${number / baseNumber}rem`,
    linearGradient: (color, colorState, angle = 195) => `linear-gradient(${angle}deg, ${color}, ${colorState})`
  },
  components: {
    MuiCard: {...card}
  }
});