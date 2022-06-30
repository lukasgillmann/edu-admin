import React from "react";
import { Box } from "@mui/material";
import VText from "../form/VText";

const BTotalContent = (props) => {

  // const { series } = props;

  return <Box className="border border-solid border-gray-300 h-full rounded-md p-6">
    <VText className="text-xl">Total Content</VText>
  </Box>;
};

export default BTotalContent;