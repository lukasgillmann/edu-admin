import Popover from '@mui/material/Popover';
import { useState } from 'react';

const BPopOver = (props) => {

  const { trigger, children, autoClose = true, ...rest } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return <>
    <div onClick={handleClick} {...rest}>
      {trigger}
    </div>

    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div onClick={() => autoClose ? handleClose() : {}}>
        {children}
      </div>
    </Popover>
  </>;
};

export default BPopOver;