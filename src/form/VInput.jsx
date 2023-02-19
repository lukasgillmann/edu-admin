import { InputAdornment, TextField, Icon } from "@mui/material";
import React from "react";

const VInput = (props) => {

  const {
    inputClassName,
    InputClassName,
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
        <Icon className={InputClassName}>{startIcon}</Icon>
      </InputAdornment>
    )
  } : endIcon ? {
    endAdornment: (
      <InputAdornment position="start">
        <Icon className={InputClassName}>{endIcon}</Icon>
      </InputAdornment>
    )
  } : {};

  return <>
    <TextField
      label={label}
      value={value}
      onChange={e => setValue(e.target.value)}
      multiline={rows && rows > 1 ? true : false}
      rows={rows && rows > 1 ? rows : 1}
      InputProps={
        {
          ...inputProps,
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

VInput.defaultProps = {
  InputClassName: '',
  value: '',
  setValue: () => { },
  rows: 1,
  variant: 'outlined', // filled, standard
  startIcon: null,
  endIcon: null,
};


export default VInput;