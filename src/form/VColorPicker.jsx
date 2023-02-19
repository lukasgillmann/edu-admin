import { Button } from "@mui/material";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { VText } from ".";

const VColorPicker = (props) => {

  const { color, setColor, children, ...rest } = props;

  const [show, setShow] = useState(false);

  const onChange = (val) => {
    setColor(val.hex);
  };

  return <div className="w-min">

    <Button
      variant="contained"
      onClick={() => setShow(true)}
      style={{ backgroundColor: color }}
      {...rest}
    >
      {children}
    </Button>

    <VText color="secondary" div className="text-center mt-2 text-xs">{color}</VText>

    {
      show &&
      <div className="absolute z-10">
        <div className="fixed top-0 right-0 left-0 bottom-0" onClick={() => setShow(false)} />
        <SketchPicker
          color={color}
          onChange={onChange}
          disableAlpha={true}
        />
      </div>
    }
  </div>;
};

VColorPicker.defaultProps = {
  color: '#DBCD19',
  setColor: () => { }
};

export default VColorPicker;