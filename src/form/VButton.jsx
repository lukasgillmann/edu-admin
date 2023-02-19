import { LoadingButton } from "@mui/lab";
import { Icon, IconButton } from "@mui/material";
import React from "react";

const VButton = (props) => {

  const {
    className,
    startIcon,
    endIcon,
    children,
    iconButton,
    iconOnly,
    ...rest
  } = props;

  return <>
    {
      iconButton && <LoadingButton
        className={`${className} p-2 min-w-0 normal-case`}
        sx={{ borderRadius: '8px' }}
        {...rest}
      // disableElevation
      >
        {children}
      </LoadingButton>
    }
    {
      iconOnly && <IconButton
        className={`${className} p-2 min-w-0`}
        {...rest}
      >
        {children}
      </IconButton>
    }
    {
      !iconButton && !iconOnly && <LoadingButton
        className={`normal-case ${className}`}
        startIcon={startIcon ? <Icon>{startIcon}</Icon> : null}
        endIcon={endIcon ? <Icon>{endIcon}</Icon> : null}
        loadingPosition={startIcon ? "start" : undefined}
        {...rest}
      >
        {children}
      </LoadingButton>
    }
  </>;
};

VButton.defaultProps = {
  className: '',
  startIcon: null,
  endIcon: null,
  children: '',
  iconButton: false,
  iconOnly: false,
  // disabled: false,
  // loading: false
};

export default VButton;