

// Material Dashboard 2 PRO React base styles
// import boxShadows from "../../base/boxShadows";
// import typography from "../../base/typography";
// import colors from "../../base/colors";
// import borders from "../../base/borders";

// // Material Dashboard 2 PRO React helper functions
// import pxToRem from "../../functions/pxToRem";

// const { md } = boxShadows;
// const { size } = typography;
// const { text, background } = colors;
// const { borderRadius } = borders;

const menu = {
  defaultProps: {
    disableAutoFocusItem: true,
  },

  styleOverrides: {
    paper: {
      // minWidth: pxToRem(160),
      // boxShadow: md,
      // padding: `${pxToRem(16)} ${pxToRem(8)}`,
      // fontSize: size.sm,
      color: 'white !important',
      textAlign: "left",
      backgroundColor: '#323232 !important'
      // backgroundColor: `${background.card} !important`,
      // borderRadius: borderRadius.md,
    },
  },
};

export default menu;