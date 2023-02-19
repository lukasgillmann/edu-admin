import { createTheme } from "@mui/material/styles";

export default function darkTheme(themes) {
  return createTheme({
    palette: {
      background: {},
      primary: {
        main: "#E25640",
        state: "#D81B60",
        contrastText: "#000000"
      },
      secondary: {
        main: "#9CA0A0",
        state: "#D81B60",
        contrastText: "#FFF"
      },
      info: {
        main: "#FEE2E2",
        state: "#D81B60",
        contrastText: "#EF4444"
      },
      body: {
        main: "#FFFFFF",
        state: "#D81B60",
        contrastText: "#000000"
      },
    },
  });
}