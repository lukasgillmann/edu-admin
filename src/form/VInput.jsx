import { InputAdornment, TextField, Icon } from "@mui/material";
import React from "react";

const VInput = (props) => {

  const {
    className,
    inputClassName,
    label,
    value,
    setValue,
    rows,
    variant,
    startIcon,
    endIcon,
    noBorder,
    ...rest
  } = props;

  const inputProps = startIcon ? {
    startAdornment: (
      <InputAdornment position="start">
        <Icon className={inputClassName}>{startIcon}</Icon>
      </InputAdornment>
    )
  } : endIcon ? {
    endAdornment: (
      <InputAdornment position="start">
        <Icon className={inputClassName}>{endIcon}</Icon>
      </InputAdornment>
    )
  } : {};

  return <>
    <TextField
      className={className}
      label={label}
      value={value}
      onChange={e => setValue(e.target.value)}
      multiline={rows && rows > 1 ? true : false}
      rows={rows && rows > 1 ? rows : 1}
      variant={variant}
      InputProps={
        {
          ...inputProps,
          className: inputClassName
        }
      }
      {...rest}
    />
  </>;
};

VInput.defaultProps = {
  className: '',
  inputClassName: '',
  value: '',
  setValue: () => { },
  rows: 1,
  variant: 'outlined', // filled, standard
  startIcon: null,
  endIcon: null,
  noBorder: false
};


export default VInput;