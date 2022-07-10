

// Material Dashboard 2 PRO React Base Styles
import colors from "../../base/colors";

const { background } = colors;

const textfield = {
  styleOverrides: {
    root: {
      "& .MuiInputBase-input": {
        color: 'white'
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: '#666666'
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: '#999999 !important'
      }
    }
  },
};

export default textfield;