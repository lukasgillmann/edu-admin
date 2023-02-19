import React from "react";
import { VText } from "../form";

const BProgressBar = (props) => {

  const { label, value, success = false, ...rest } = props;

  return <div {...rest}>
    <div className="flex justify-between mb-1">
      <VText className="text-limit-1" color="secondary" div>{label}</VText>
      <VText>{value}%</VText>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
      <div className={`${success ? 'bg-gray-500' : 'bg-blue-600'} h-1.5 rounded-full`} style={{width: `${value}%`}} />
    </div>

  </div>;
};

export default BProgressBar;