import { createTheme } from "@mui/material";

export default createTheme({
  functions: {
    pxToRem: (number, baseNumber = 16) => `${number / baseNumber}rem`
  }
});