

const select = {
  styleOverrides: {
    root: {
      "& .MuiSelect-select": {
        color: 'white'
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: '#666666',
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: '#999999 !important'
      }
    },
    select: {
      display: "grid",
      alignItems: "center",
      "& .Mui-selected": {
        backgroundColor: 'transparent',
      },
    },

    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    },

    icon: {
      display: "none",
    },
  },
};

export default select;