import React from "react";
import { Box } from "@mui/material";
import VText from "../form/VText";
import GCircular from "../graphs/GCircular";

const BTotalContent = (props) => {

  // const { series } = props;

  return <Box className="border border-solid border-gray-300 h-full rounded-md p-6">
    <VText className="text-xl">Total Content</VText>
    <Box className="flex justify-center max-h-64 overflow-y-auto">
      <Box className="w-full h-full">
        <GCircular />
      </Box>
    </Box>
  </Box>;
};

export default BTotalContent;