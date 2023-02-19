import { FormControlLabel, styled, Switch } from "@mui/material";
import React from "react";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const SquareSwitch = styled(Switch)(({ theme }) => ({
  padding: 0,
  height: 30,
  width: 32,
  borderRadius: 2,
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      transform: 'translateX(14px)',
      color: '#fff',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 500 500"><path fill="${encodeURIComponent(
          '#9CA0A0',
        )}" d="M306.3 32.62 65.46 252.86 312 478.8l-29.84 32.62L0 252.83 276.46 0z"/></svg>')`,
      },
    }
  },
  '& .MuiSwitch-track': {
    borderRadius: 2,
    backgroundColor: '#9B9F9F !important',
    opacity: '1 !important'
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    borderRadius: 2,
    width: 14,
    height: 26,
    transform: 'translate(-7px, -7px)',
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 2,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 500 500"><path fill="${encodeURIComponent(
        '#9CA0A0',
      )}" d="M35.54 0 312 252.82 29.84 511.42 0 478.8l246.54-225.94L5.7 32.62z"/></svg>')`,
    },
  },
}));

const VSwitch = (props) => {

  const { checked, setChecked, children, color, type, className, ...rest } = props;

  const handleCheck = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    setChecked(!checked);
  };

  return <>
    {
      type === 'Android' &&
      <FormControlLabel
        control={
          <Android12Switch
            checked={checked}
            onChange={handleCheck}
            name={children}
            color={color}
          />
        }
        className={`${className} v-android-switch`}
        label={children}
        {...rest}
      />
    }
    {
      type === 'square' &&
      <FormControlLabel
        control={
          <SquareSwitch
            checked={checked}
            onChange={handleCheck}
            name={children}
            color={color}
          />
        }
        className={className}
        label={children}
        sx={{borderRadius: '2px'}}
        {...rest}
      />
    }
    {
      type === 'normal' &&
      <FormControlLabel
        sx={{
          display: 'block',
        }}
        control={
          <Switch
            checked={checked}
            onChange={handleCheck}
            name={children}
            color={color}
          />
        }
        className={className}
        label={children}
        {...rest}
      />
    }

  </>;
};

VSwitch.defaultProps = {
  checked: false,
  setChecked: () => { },
  children: '',
  color: 'primary',
  type: 'normal'
};

export default VSwitch;