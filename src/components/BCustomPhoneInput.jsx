import { TextField } from '@mui/material';
import { forwardRef } from 'react';

const CustomPhoneINput = (props, ref) => {
  return (
    <TextField
      {...props}
      inputRef={ref}
      fullWidth
      size='small'
      name='phone_number'
      color="secondary"
    />
  );
};
export default forwardRef(CustomPhoneINput);