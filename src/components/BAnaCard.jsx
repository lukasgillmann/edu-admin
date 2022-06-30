import { Box, Icon } from "@mui/material";
import React from "react";
import VText from "../form/VText";

const BAnaCard = (props) => {

  const { icon, label, value, className } = props;

  return <Box className={`border border-solid border-gray-300 rounded-md px-6 py-5 flex items-center ${className}`}>
    <Box className="bg-gray-200 rounded-full w-14 h-14 flex justify-center items-center">
      <Icon className="color-primary">{icon}</Icon>
    </Box>
    <Box className="ml-6">
      <VText className="text-sm">{label}</VText>
      <VText className="text-xl">{value}</VText>
    </Box>
  </Box>;
};

export default BAnaCard;