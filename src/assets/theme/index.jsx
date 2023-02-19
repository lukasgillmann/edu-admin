import { createTheme } from "@mui/material/styles";

export default function lightTheme(themes) {

  return createTheme({
    palette: {
      background: {},
      primary: {
        main: themes.find(v => v.name === 'color_main1')?.value || "#E25640",
        state: "#D81B60",
        contrastText: "#FFFFFF"
      },
      secondary: {
        main: "#9CA0A0",
        state: "#D81B60",
        contrastText: "#FFFFFF"
      },
      error: {
        main: "#E25640",
        state: "#B22640",
        contrastText: "#FFFFFF"
      },
      info: {
        main: "#FFEEED",
        state: "#D81B60",
        contrastText: "#E94F33",
      },
      body: {
        main: "#000000",
        state: "#D81B60",
        contrastText: "#FFFFFF"
      },
    },
  });
}