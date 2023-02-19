import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from 'react-i18next';

const VSelect = (props) => {

  const { t } = useTranslation('common');

  const { option, setOption, label, items, variant, inputClassName = '', ...rest } = props;

  return <>
    {
      items.length > 0 &&
      <FormControl variant={variant} {...rest}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label={label}
          onChange={e => setOption(e.target.value)}
          inputProps={{ className: inputClassName }}
        >
          {
            items.map(v => <MenuItem key={v.value} value={v.value}>{t(v.label)}</MenuItem>)
          }
        </Select>
      </FormControl>
    }

  </>;
};

VSelect.defaultProps = {
  option: '',
  setOption: () => { },
  items: [],
  label: '',
  variant: 'outlined' // filled, standard
};

export default VSelect;