import { InputAdornment, OutlinedInput, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

const VPassword = (props) => {

  const {
    inputClassName,
    InputClassName,
    label,
    value,
    setValue,
    variant,
    noBorder,
    onChange,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return <>
    <OutlinedInput
      label={label}
      value={value}
      onChange={onChange}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      inputprops={
        {
          className: InputClassName
        }
      }
      inputProps={
        {
          className: inputClassName
        }
      }
      {...rest}
    />
  </>;
};

VPassword.defaultProps = {
  InputClassName: '',
  value: '',
  setValue: () => { },
  variant: 'outlined'
};


export default VPassword;