

// Material Dashboard 2 PRO React Base Styles
import colors from "../../base/colors";

const { background } = colors;

const card = {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      backgroundImage: "none",
      backgroundColor: background.card,
      backgroundClip: "border-box",
      overflow: "visible",
    },
  },
};

export default card;